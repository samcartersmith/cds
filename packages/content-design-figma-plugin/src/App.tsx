import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type {
  AppScreen,
  ChatMessage,
  EvaluationMode,
  FullEvaluationSummary,
  MultiScreenSelection,
  RepeatReviewCheckResult,
  ReportSegment,
  SavedChatSession,
  Suggestion,
  UIMessage,
} from './types';
import { runAgentCompletion } from './lib/ai';
import { getAgentForEvaluationMode } from './agents/registry';
import {
  buildSavedSession,
  formatSelectionLabel,
  upsertSavedChats,
} from './lib/chatHistoryStorage';
import {
  flattenReportItems,
  newReportSegment,
  reportSegmentsFromSavedSession,
} from './lib/reportSegments';

import SelectionContextBar from './components/SelectionContextBar';
import ChatTimeline from './components/ChatTimeline';
import SuggestionCards from './components/SuggestionCards';
import ReportPanel from './components/ReportPanel';
import ChatInput from './components/ChatInput';
import ReplaceButton from './components/ReplaceButton';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import NoSelection from './components/NoSelection';
import EvaluationModeScreen from './components/EvaluationModeScreen';
import HistorySheet from './components/HistorySheet';
import PluginHeader from './components/PluginHeader';
import EmptyState from './components/EmptyState';
import ResizeHandle from './components/ResizeHandle';
import ThinkingIndicator from './components/ThinkingIndicator';
import ErrorBanner from './components/ErrorBanner';
import { usePluginMessages } from './hooks/usePluginMessages';
import { useReplaceState } from './hooks/useReplaceState';
import { normalizeOrBuildSummary } from './lib/qualityScore';

const DEV_CHAT_HISTORY_LS = 'figma_plugin_chat_history_v1';

function postToPlugin(msg: UIMessage) {
  parent.postMessage({ pluginMessage: msg }, '*');
}

function patchSelectionText(
  sel: MultiScreenSelection,
  nodeId: string,
  newText: string,
): MultiScreenSelection {
  return {
    ...sel,
    screens: sel.screens.map((screen) => ({
      ...screen,
      layers: screen.layers.map((layer) =>
        layer.id === nodeId ? { ...layer, characters: newText } : layer,
      ),
    })),
  };
}

function getLayerCharacters(sel: MultiScreenSelection | null, nodeId: string): string | undefined {
  if (!sel) return undefined;
  for (const screen of sel.screens) {
    for (const layer of screen.layers) {
      if (layer.id === nodeId) return layer.characters;
    }
  }
  return undefined;
}

const MOCK_SELECTION: MultiScreenSelection = {
  screens: [
    {
      id: 'screen-mock-1',
      name: 'Hero',
      layers: [
        {
          id: 'mock-node-1',
          name: 'Hero / CTA',
          characters: 'Confirm your email to get started with your free trial.',
          hasMissingFont: false,
        },
      ],
    },
  ],
  activeLayerId: 'mock-node-1',
  totalTextLayers: 1,
};

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('loading');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [evaluationMode, setEvaluationMode] = useState<EvaluationMode | null>(null);
  const [selection, setSelection] = useState<MultiScreenSelection | null>(null);
  const [activeLayerId, setActiveLayerId] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [reportSegments, setReportSegments] = useState<ReportSegment[]>([]);
  const reportItems = useMemo(() => flattenReportItems(reportSegments), [reportSegments]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedReportItemId, setSelectedReportItemId] = useState<string | null>(null);
  /** Finding ids whose proposed suggestion has been applied */
  const [appliedFindingIds, setAppliedFindingIds] = useState<string[]>([]);
  /** Finding ids that have been dismissed in the report panel */
  const [dismissedFindingIds, setDismissedFindingIds] = useState<string[]>([]);
  /** Suggestion ids that have been dismissed in suggestions mode */
  const [dismissedSuggestionIds, setDismissedSuggestionIds] = useState<string[]>([]);
  /** Pending repeat review check result — drives the already-reviewed interstitial */
  const [repeatReviewResult, setRepeatReviewResult] = useState<RepeatReviewCheckResult | null>(null);
  /** Prompt stored while waiting for a CHECK_REPEAT_REVIEW response */
  const pendingReviewPromptRef = useRef<string | null>(null);

  const [isThinking, setIsThinking] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isReportContextStale, setIsReportContextStale] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  /** Main chat transcript scroll area; finding deselect only applies to clicks inside this region */
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string | null>(null);
  /** Tracks the AbortController for the current in-flight AI request so it can be cancelled on node/mode switch */
  const aiAbortControllerRef = useRef<AbortController | null>(null);
  /** Set when navigating to the evaluation menu via Back; used to restore chat if user re-picks the same mode */
  const evaluationModeBeforeMenuRef = useRef<EvaluationMode | null>(null);
  /** Set before FOCUS_NODE so the next SELECTION_CHANGED does not wipe report/suggestions */
  const focusFindingSuppressSelectionResetRef = useRef(false);
  const screenBeforeSettingsRef = useRef<AppScreen | null>(null);
  const messagesRef = useRef(messages);
  const reportItemsRef = useRef(reportItems);
  const isInsideFigma = window.parent !== window;

  const {
    replaceLoading,
    setReplaceLoading,
    replaceSuccess,
    setReplaceSuccess,
    replaceError,
    setReplaceError,
    replacedLayerId,
    setReplacedLayerId,
    reportFixSuccessWasRevert,
    setReportFixSuccessWasRevert,
    revertPayloadByFindingIdRef,
    replaceOperationRef,
    lastReportFindingIdRef,
    resetReplaceFeedback,
  } = useReplaceState();

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    reportItemsRef.current = reportItems;
  }, [reportItems]);

  /** Deselect finding when clicking inside the chat scroll area but not on a finding card */
  useEffect(() => {
    if (selectedReportItemId == null) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      const root = chatScrollRef.current;
      if (!root?.contains(el)) return;
      if (el.closest('[data-finding-card]')) return;
      setSelectedReportItemId(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [selectedReportItemId]);

  const [savedChats, setSavedChats] = useState<SavedChatSession[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [appliedOpen, setAppliedOpen] = useState(false);

  /** Abort any in-flight AI request and unblock the UI immediately. */
  const cancelAiRequest = useCallback(() => {
    if (aiAbortControllerRef.current) {
      aiAbortControllerRef.current.abort();
      aiAbortControllerRef.current = null;
    }
    setIsThinking(false);
  }, []);

  const agentUiMode =
    evaluationMode != null ? getAgentForEvaluationMode(evaluationMode).uiMode : 'suggestions';
  const fixedItems = useMemo(() => {
    if (appliedFindingIds.length === 0) return [] as typeof reportItems;
    const appliedSet = new Set(appliedFindingIds);
    const byId = new Map<string, (typeof reportItems)[number]>();
    for (const item of reportItems) {
      if (appliedSet.has(item.id)) {
        byId.set(item.id, item);
      }
    }
    return Array.from(byId.values()).sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return a.title.localeCompare(b.title);
    });
  }, [appliedFindingIds, reportItems]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, suggestions, reportSegments, isThinking]);

  usePluginMessages({
    screen,
    isReportMode: agentUiMode === 'report',
    setApiKey,
    setEvaluationMode,
    setSelection,
    setSavedChats,
    setCurrentFileName,
    setActiveLayerId,
    setScreen,
    setSuggestions,
    setReportSegments,
    setAppliedFindingIds,
    setSelectedId,
    setSelectedReportItemId,
    setAiError,
    setIsReportContextStale,
    setReplaceLoading,
    setReplaceSuccess,
    setReplaceError,
    setReplacedLayerId,
    setReportFixSuccessWasRevert,
    setRepeatReviewResult,
    messagesRef,
    reportItemsRef,
    focusFindingSuppressSelectionResetRef,
    cancelAiRequest,
    revertPayloadByFindingIdRef,
    replaceOperationRef,
    lastReportFindingIdRef,
    pendingReviewPromptRef,
    patchSelectionText,
  });

  useEffect(() => {
    if (isInsideFigma) postToPlugin({ type: 'UI_READY' });
  }, [isInsideFigma]);

  useEffect(() => {
    if (window.parent === window) {
      setSelection(MOCK_SELECTION);
      setCurrentFileName('Local preview');
      setEvaluationMode(null);
      setScreen('evaluation');
      try {
        const raw = localStorage.getItem(DEV_CHAT_HISTORY_LS);
        if (raw) {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            setSavedChats(parsed as SavedChatSession[]);
          }
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  const handleSaveApiKey = useCallback(
    (key: string) => {
      setApiKey(key);
      if (screen === 'settings') {
        setScreen(screenBeforeSettingsRef.current ?? 'evaluation');
        screenBeforeSettingsRef.current = null;
      }
      if (isInsideFigma) {
        postToPlugin({ type: 'SAVE_API_KEY', key });
      } else {
        if (screen !== 'settings') {
          setScreen('evaluation');
        }
      }
    },
    [isInsideFigma, screen],
  );

  const handleOpenSettings = useCallback(() => {
    screenBeforeSettingsRef.current = screen;
    setHistoryOpen(false);
    setScreen('settings');
  }, [screen]);

  const handleBackFromSettings = useCallback(() => {
    setScreen(screenBeforeSettingsRef.current ?? 'evaluation');
    screenBeforeSettingsRef.current = null;
  }, []);

  const handleFocusReportLayer = useCallback(
    (nodeId: string, frameId?: string) => {
      if (isInsideFigma) {
        focusFindingSuppressSelectionResetRef.current = true;
        postToPlugin({ type: 'FOCUS_NODE', nodeId, ...(frameId ? { frameId } : {}) });
      }
      setActiveLayerId(nodeId);
    },
    [isInsideFigma],
  );

  const handleDismissFinding = useCallback((id: string) => {
    setDismissedFindingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    if (selectedReportItemId === id) setSelectedReportItemId(null);
  }, [selectedReportItemId]);

  const handleDismissSuggestion = useCallback((id: string) => {
    setDismissedSuggestionIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  const persistSessionSnapshot = useCallback(
    (payload: {
      messages: ChatMessage[];
      suggestions: Suggestion[];
      reportSegments: ReportSegment[];
    }) => {
      const sid = sessionIdRef.current;
      const mode = evaluationMode;
      if (!sid || !mode || payload.messages.length === 0) return;
      const session = buildSavedSession({
        id: sid,
        evaluationMode: mode,
        messages: payload.messages,
        suggestions: payload.suggestions,
        reportSegments: payload.reportSegments,
        selectionLabel: formatSelectionLabel(selection),
        fileName: currentFileName ?? undefined,
      });
      setSavedChats((prev) => {
        const next = upsertSavedChats(prev, session);
        if (isInsideFigma) {
          postToPlugin({ type: 'SAVE_CHAT_HISTORY', entries: next });
        } else {
          try {
            localStorage.setItem(DEV_CHAT_HISTORY_LS, JSON.stringify(next));
          } catch {
            /* ignore */
          }
        }
        return next;
      });
    },
    [currentFileName, evaluationMode, selection, isInsideFigma],
  );

  const handleSelectEvaluationMode = useCallback(
    (mode: EvaluationMode) => {
      const returnMode = evaluationModeBeforeMenuRef.current;
      evaluationModeBeforeMenuRef.current = null;
      const sameModeReturn = returnMode !== null && mode === returnMode;

      if (!sameModeReturn) {
      cancelAiRequest();
      sessionIdRef.current = `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setMessages([]);
      setSuggestions([]);
      setReportSegments([]);
      setIsReportContextStale(false);
      setAppliedFindingIds([]);
      setDismissedFindingIds([]);
      setDismissedSuggestionIds([]);
      revertPayloadByFindingIdRef.current = {};
      setSelectedId(null);
      setSelectedReportItemId(null);
      setRepeatReviewResult(null);
      pendingReviewPromptRef.current = null;
      }

      setEvaluationMode(mode);
      setAiError(null);
      if (isInsideFigma) {
        postToPlugin({ type: 'SAVE_EVALUATION_MODE', mode });
      }
      setScreen(
        selection || messages.length > 0 || reportSegments.length > 0 ? 'chat' : 'no-selection',
      );
    },
    [isInsideFigma, messages.length, reportSegments.length, selection, revertPayloadByFindingIdRef],
  );

  const handleSend = useCallback(
    async (prompt: string) => {
      if (!prompt.trim() || isThinking || !evaluationMode) return;

      const hasCanvas = selection != null && selection.totalTextLayers > 0;
      const allowWithoutSelection = messages.length > 0 || reportSegments.length > 0;
      if (!hasCanvas && !allowWithoutSelection) return;

      // Cancel any previous in-flight request before starting a new one
      cancelAiRequest();
      const abortController = new AbortController();
      aiAbortControllerRef.current = abortController;

      const now = Date.now();
      const userMsg: ChatMessage = { role: 'user', text: prompt, sentAt: now };
      const messagesAfterUser = [...messages, userMsg];
      setMessages((prev) => [...prev, userMsg]);
      setAiError(null);
      resetReplaceFeedback();
      setSelectedReportItemId(null);
      setIsReportContextStale(false);
      setIsThinking(true);

      const selectionForApi = hasCanvas ? selection : null;
      const activeForApi = hasCanvas && selection ? activeLayerId || selection.activeLayerId : '';

      const useDevMock = !apiKey || !isInsideFigma;
      if (useDevMock) {
        await new Promise((r) => setTimeout(r, 1200));
        const agent = getAgentForEvaluationMode(evaluationMode);
        if (agent.uiMode === 'suggestions') {
          const { getMockSuggestions } = await import('./mockData');
          const sug = getMockSuggestions(prompt);
          setSuggestions(sug);
          persistSessionSnapshot({
            messages: messagesAfterUser,
            suggestions: sug,
            reportSegments: [],
          });
        } else if (reportSegments.length > 0) {
          const assistantMsg: ChatMessage = {
            role: 'assistant',
            text: 'This is a mock reply about your findings. Use a gateway API key in Figma for real answers.',
            sentAt: Date.now(),
          };
          const withAssistant = [...messagesAfterUser, assistantMsg];
          setMessages(withAssistant);
          persistSessionSnapshot({
            messages: withAssistant,
            suggestions: [],
            reportSegments,
          });
        } else {
          const { getMockReportItems } = await import('./mockData');
          const rep = getMockReportItems();
          const summary: FullEvaluationSummary | undefined =
            evaluationMode === 'full' ? normalizeOrBuildSummary(undefined, rep) : undefined;
          const seg = newReportSegment(messagesAfterUser.length - 1, rep, summary);
          const nextSegs = [seg];
          setReportSegments(nextSegs);
          setIsReportContextStale(false);
          setAppliedFindingIds([]);
          revertPayloadByFindingIdRef.current = {};
          persistSessionSnapshot({
            messages: messagesAfterUser,
            suggestions: [],
            reportSegments: nextSegs,
          });
        }
        setIsThinking(false);
        return;
      }

      try {
        const result = await runAgentCompletion(
          apiKey!,
          evaluationMode,
          selectionForApi,
          activeForApi,
          prompt,
          messages,
          reportItems.length > 0 ? reportItems : undefined,
          abortController.signal,
        );
        if (result.kind === 'suggestions') {
          setSuggestions(result.suggestions);
          setSelectedId(null);
          persistSessionSnapshot({
            messages: messagesAfterUser,
            suggestions: result.suggestions,
            reportSegments: [],
          });
        } else if (result.kind === 'chat') {
          const assistantMsg: ChatMessage = {
            role: 'assistant',
            text: result.text,
            sentAt: Date.now(),
          };
          const withAssistant = [...messagesAfterUser, assistantMsg];
          setMessages(withAssistant);
          persistSessionSnapshot({
            messages: withAssistant,
            suggestions: [],
            reportSegments,
          });
        } else {
          const seg = newReportSegment(messagesAfterUser.length - 1, result.items, result.summary);
          const nextSegs = [...reportSegments, seg];
          setReportSegments(nextSegs);
          setIsReportContextStale(false);
          setAppliedFindingIds([]);
          setDismissedFindingIds([]);
          revertPayloadByFindingIdRef.current = {};
          setSelectedReportItemId(null);
          persistSessionSnapshot({
            messages: messagesAfterUser,
            suggestions: [],
            reportSegments: nextSegs,
          });
          // Snapshot frame content hashes so we can detect repeat reviews
          if (isInsideFigma && selection && evaluationMode) {
            const frameIds = selection.screens.map((s) => s.id);
            postToPlugin({ type: 'SAVE_REVIEW_SNAPSHOT', scope: evaluationMode, frameIds });
          }
        }
      } catch (err) {
        // AbortError means the request was intentionally cancelled (node/mode switch) — don't show an error
        if (err instanceof Error && err.name === 'AbortError') return;
        setAiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      } finally {
        aiAbortControllerRef.current = null;
        setIsThinking(false);
      }
    },
    [
      activeLayerId,
      agentUiMode,
      apiKey,
      evaluationMode,
      isInsideFigma,
      isThinking,
      messages,
      persistSessionSnapshot,
      resetReplaceFeedback,
      reportItems,
      reportSegments,
      revertPayloadByFindingIdRef,
      selection,
    ],
  );

  const handleRevertFix = useCallback(() => {
    if (agentUiMode !== 'report') return;
    const fid = selectedReportItemId;
    if (!fid || !selection) return;
    const payload = revertPayloadByFindingIdRef.current[fid];
    if (!payload) return;

    setReplaceError(null);
    setReplaceLoading(true);
    replaceOperationRef.current = 'report-revert';
    lastReportFindingIdRef.current = fid;

    if (isInsideFigma) {
      postToPlugin({
        type: 'REPLACE',
        nodeId: payload.layerId,
        newText: payload.originalText,
      });
    } else {
      setTimeout(() => {
        setReplaceLoading(false);
        setReplaceSuccess(true);
        setReportFixSuccessWasRevert(true);
        setReplacedLayerId(payload.layerId);
        setSelection((prev) =>
          prev ? patchSelectionText(prev, payload.layerId, payload.originalText) : prev,
        );
        setAppliedFindingIds((prev) => prev.filter((id) => id !== fid));
        delete revertPayloadByFindingIdRef.current[fid];
        replaceOperationRef.current = null;
        lastReportFindingIdRef.current = null;
        setTimeout(() => {
          setReplaceSuccess(false);
          setReplacedLayerId(null);
        }, 2500);
      }, 600);
    }
  }, [
    agentUiMode,
    isInsideFigma,
    lastReportFindingIdRef,
    replaceOperationRef,
    revertPayloadByFindingIdRef,
    selectedReportItemId,
    selection,
    setReplaceError,
    setReplaceLoading,
    setReplaceSuccess,
    setReplacedLayerId,
    setReportFixSuccessWasRevert,
  ]);

  const handleApplyAll = useCallback(() => {
    if (agentUiMode !== 'report') return;
    const toApply = reportItems.filter(
      (item) =>
        Boolean(item.layerId) &&
        item.proposedText != null &&
        String(item.proposedText).trim().length > 0 &&
        !appliedFindingIds.includes(item.id) &&
        !dismissedFindingIds.includes(item.id),
    );
    if (toApply.length === 0) return;
    for (const item of toApply) {
      if (!item.layerId || item.proposedText == null) continue;
      const originalText = getLayerCharacters(selection, item.layerId);
      if (originalText !== undefined) {
        revertPayloadByFindingIdRef.current[item.id] = {
          layerId: item.layerId,
          originalText,
        };
      }
      if (isInsideFigma) {
        postToPlugin({ type: 'REPLACE', nodeId: item.layerId, newText: item.proposedText });
      }
      setAppliedFindingIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    }
  }, [agentUiMode, appliedFindingIds, dismissedFindingIds, isInsideFigma, reportItems, revertPayloadByFindingIdRef, selection]);

  const handleUndoAll = useCallback(() => {
    if (agentUiMode !== 'report') return;
    const toRevert = appliedFindingIds.filter(
      (fid) => revertPayloadByFindingIdRef.current[fid] != null,
    );
    if (toRevert.length === 0) return;
    for (const fid of toRevert) {
      const payload = revertPayloadByFindingIdRef.current[fid];
      if (!payload) continue;
      if (isInsideFigma) {
        postToPlugin({ type: 'REPLACE', nodeId: payload.layerId, newText: payload.originalText });
      }
      setAppliedFindingIds((prev) => prev.filter((id) => id !== fid));
      delete revertPayloadByFindingIdRef.current[fid];
    }
  }, [agentUiMode, appliedFindingIds, isInsideFigma, revertPayloadByFindingIdRef]);

  const handleReplace = useCallback(() => {
    if (agentUiMode === 'report') {
      const finding = reportItems.find((r) => r.id === selectedReportItemId);
      const nodeId = finding?.layerId;
      const newText = finding?.proposedText;
      if (!finding || !nodeId || newText == null || newText === '' || !selection) return;

      const originalText = getLayerCharacters(selection, nodeId);
      if (originalText === undefined) return;

      setReplaceError(null);
      setReplaceLoading(true);
      revertPayloadByFindingIdRef.current[finding.id] = { layerId: nodeId, originalText };
      replaceOperationRef.current = 'report-apply';
      lastReportFindingIdRef.current = finding.id;

      if (isInsideFigma) {
        postToPlugin({ type: 'REPLACE', nodeId, newText });
      } else {
        setTimeout(() => {
          setReplaceLoading(false);
          setReplaceSuccess(true);
          setReportFixSuccessWasRevert(false);
          setReplacedLayerId(nodeId);
          setSelection((prev) => (prev ? patchSelectionText(prev, nodeId, newText) : prev));
          setAppliedFindingIds((prev) =>
            prev.includes(finding.id) ? prev : [...prev, finding.id],
          );
          replaceOperationRef.current = null;
          lastReportFindingIdRef.current = null;
          setTimeout(() => {
            setReplaceSuccess(false);
            setReplacedLayerId(null);
          }, 2500);
        }, 600);
      }
      return;
    }

    const chosen = suggestions.find((s) => s.id === selectedId);
    const targetId = activeLayerId || selection?.activeLayerId;
    if (!chosen || !selection || !targetId) return;

    setReplaceError(null);
    setReplaceLoading(true);
    replaceOperationRef.current = 'suggestion';
    lastReportFindingIdRef.current = null;

    if (isInsideFigma) {
      postToPlugin({ type: 'REPLACE', nodeId: targetId, newText: chosen.text });
    } else {
      setTimeout(() => {
        setReplaceLoading(false);
        setReplaceSuccess(true);
        setReplacedLayerId(targetId);
        setSelection((prev) => (prev ? patchSelectionText(prev, targetId, chosen.text) : prev));
        replaceOperationRef.current = null;
        setTimeout(() => {
          setReplaceSuccess(false);
          setReplacedLayerId(null);
        }, 2500);
      }, 600);
    }
  }, [
    activeLayerId,
    agentUiMode,
    isInsideFigma,
    lastReportFindingIdRef,
    replaceOperationRef,
    reportItems,
    revertPayloadByFindingIdRef,
    selectedId,
    selectedReportItemId,
    selection,
    setReplaceError,
    setReplaceLoading,
    setReplaceSuccess,
    setReplacedLayerId,
    setReportFixSuccessWasRevert,
    suggestions,
  ]);

  const handleBackToEvaluation = useCallback(() => {
    if (sessionIdRef.current && evaluationMode && messages.length > 0) {
      persistSessionSnapshot({ messages, suggestions, reportSegments });
    }
    evaluationModeBeforeMenuRef.current = evaluationMode;
    setAiError(null);
    setReplaceError(null);
    setReplaceSuccess(false);
    setReplacedLayerId(null);
    setIsReportContextStale(false);
    setEvaluationMode(null);
    setScreen('evaluation');
    if (isInsideFigma) {
      postToPlugin({ type: 'CLEAR_EVALUATION_MODE' });
    }
  }, [
    evaluationMode,
    isInsideFigma,
    messages,
    persistSessionSnapshot,
    reportSegments,
    setReplaceError,
    setReplaceSuccess,
    setReplacedLayerId,
    suggestions,
  ]);

  const handleRestoreFromHistory = useCallback(
    (entry: SavedChatSession) => {
      evaluationModeBeforeMenuRef.current = null;
      sessionIdRef.current = `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setEvaluationMode(entry.evaluationMode);
      setMessages(entry.messages);
      setSuggestions(entry.suggestions);
      const restoredSegs = reportSegmentsFromSavedSession(entry);
      setReportSegments(restoredSegs);
      setAppliedFindingIds([]);
      setDismissedFindingIds([]);
      setDismissedSuggestionIds([]);
      revertPayloadByFindingIdRef.current = {};
      setSelectedId(null);
      setSelectedReportItemId(null);
      setAiError(null);
      setReplaceError(null);
      setReplaceSuccess(false);
      setReplacedLayerId(null);
      setIsReportContextStale(false);
      setRepeatReviewResult(null);
      pendingReviewPromptRef.current = null;
      setHistoryOpen(false);
      if (isInsideFigma) {
        postToPlugin({ type: 'SAVE_EVALUATION_MODE', mode: entry.evaluationMode });
      }
      setScreen(
        selection || entry.messages.length > 0 || restoredSegs.length > 0 ? 'chat' : 'no-selection',
      );
    },
    [
      isInsideFigma,
      revertPayloadByFindingIdRef,
      selection,
      setReplaceError,
      setReplaceSuccess,
      setReplacedLayerId,
    ],
  );

  const selectedSuggestion = suggestions.find((s) => s.id === selectedId) ?? null;

  const selectedReportFinding = reportItems.find((r) => r.id === selectedReportItemId) ?? null;
  const canApplyReportFix = Boolean(
    selectedReportFinding?.layerId &&
      selectedReportFinding.proposedText != null &&
      String(selectedReportFinding.proposedText).trim().length > 0,
  );
  const selectedFindingApplied =
    selectedReportItemId != null && appliedFindingIds.includes(selectedReportItemId);
  const selectedRevertPayload =
    selectedReportItemId != null
      ? revertPayloadByFindingIdRef.current[selectedReportItemId]
      : undefined;
  const reportFixMode: 'apply' | 'revert' | 'revert_unavailable' = selectedFindingApplied
    ? selectedRevertPayload
      ? 'revert'
      : 'revert_unavailable'
    : 'apply';

  const showBackToEvaluation =
    evaluationMode != null && (screen === 'chat' || screen === 'no-selection');

  const chatPlaceholder =
    evaluationMode === 'content'
      ? 'Ask for a rewrite, tone change, shorter version…'
      : 'Ask for a review, list what to check, or request a full pass…';

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isInsideFigma) return;
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startW = window.innerWidth;
      const startH = window.innerHeight;

      const onMouseMove = (mv: MouseEvent) => {
        const newW = Math.max(280, Math.min(800, startW + (mv.clientX - startX)));
        const newH = Math.max(380, Math.min(900, startH + (mv.clientY - startY)));
        postToPlugin({ type: 'RESIZE', width: Math.round(newW), height: Math.round(newH) });
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [isInsideFigma],
  );

  if (screen === 'loading') {
    return (
      <div className="relative flex items-center justify-center h-screen bg-figma-bg">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-figma-purple animate-pulse-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <ResizeHandle onMouseDown={handleResizeMouseDown} />
      </div>
    );
  }

  if (screen === 'api-key') {
    return (
      <div className="relative flex flex-col h-screen bg-figma-bg text-figma-text">
        <PluginHeader showSettings={false} onSettingsClick={() => {}} />
        <ApiKeyPrompt onSave={handleSaveApiKey} />
        <ResizeHandle onMouseDown={handleResizeMouseDown} />
      </div>
    );
  }

  if (screen === 'settings') {
    return (
      <div className="relative flex flex-col h-screen bg-figma-bg text-figma-text">
        <PluginHeader
          title="Settings"
          showSettings={false}
          onSettingsClick={() => {}}
          showBack
          onBack={handleBackFromSettings}
        />
        <ApiKeyPrompt onSave={handleSaveApiKey} initialValue={apiKey ?? ''} saveLabel="Save key" />
        <ResizeHandle onMouseDown={handleResizeMouseDown} />
      </div>
    );
  }

  const showHistoryNav = !!apiKey || savedChats.length > 0;

  if (screen === 'evaluation') {
    return (
      <div className="relative flex flex-col h-screen bg-figma-bg text-figma-text select-none overflow-hidden">
        <PluginHeader
          showSettings={!!apiKey}
          onSettingsClick={handleOpenSettings}
          showHistory={showHistoryNav}
          onHistoryClick={() => setHistoryOpen(true)}
        />
        <EvaluationModeScreen onSelect={handleSelectEvaluationMode} />
        {showHistoryNav && (
          <HistorySheet
            open={historyOpen}
            entries={savedChats}
            onClose={() => setHistoryOpen(false)}
            onSelect={handleRestoreFromHistory}
          />
        )}
        <ResizeHandle onMouseDown={handleResizeMouseDown} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen bg-figma-bg text-figma-text select-none overflow-hidden">
      <PluginHeader
        title={
          evaluationMode != null
            ? getAgentForEvaluationMode(evaluationMode).label
            : 'CDS Review'
        }
        showSettings
        onSettingsClick={handleOpenSettings}
        showBack={showBackToEvaluation}
        onBack={handleBackToEvaluation}
        showHistory={showHistoryNav}
        onHistoryClick={() => setHistoryOpen(true)}
      />

      {screen === 'no-selection' && messages.length === 0 && reportItems.length === 0 ? (
        <NoSelection />
      ) : (
        <>
          {evaluationMode && !selection && (messages.length > 0 || reportItems.length > 0) && (
            <div className="shrink-0 px-4 py-2 text-[10px] text-figma-muted border-b border-figma-border bg-figma-elevated/40">
              Select frame(s) in Figma to add live screen text to the next review.
            </div>
          )}
          {isReportContextStale && (
            <div className="shrink-0 px-4 py-2 border-b border-figma-border bg-figma-elevated/40">
              <p className="text-[11px] font-medium text-figma-text">Different frame selected</p>
              <p className="text-[10px] text-figma-muted mt-0.5">
                Suggestions are from the previous selection. Ask for a new review to refresh.
              </p>
            </div>
          )}

          {selection && (
            <SelectionContextBar
              selection={selection}
              activeLayerId={activeLayerId || selection.activeLayerId}
              replaced={replaceSuccess}
              replacedLayerId={replacedLayerId}
            />
          )}

          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-0"
          >
            {messages.length === 0 && !isThinking && (
              <EmptyState evaluationMode={evaluationMode} agentUiMode={agentUiMode} />
            )}

            {/* Repeat review interstitial */}
            {repeatReviewResult?.showInterstitial && (
              <div className="rounded-lg border border-figma-border bg-figma-elevated px-4 py-3">
                <p className="text-[12px] font-semibold text-figma-text mb-1">
                  Already reviewed
                </p>
                <p className="text-[11px] text-figma-muted leading-relaxed mb-3">
                  These screens haven't changed since the last review
                  {repeatReviewResult.lastReviewedAt
                    ? ` (${new Date(repeatReviewResult.lastReviewedAt).toLocaleString()})`
                    : ''}
                  .
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const prompt = pendingReviewPromptRef.current;
                      setRepeatReviewResult(null);
                      pendingReviewPromptRef.current = null;
                      if (prompt) handleSend(prompt);
                    }}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-figma-purple text-white hover:bg-figma-purple-hover transition-colors"
                  >
                    Review anyway
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRepeatReviewResult(null);
                      pendingReviewPromptRef.current = null;
                    }}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-lg border border-figma-border text-figma-muted hover:text-figma-text transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* Partial skip banner */}
            {repeatReviewResult != null &&
              !repeatReviewResult.showInterstitial &&
              repeatReviewResult.partialSkip &&
              repeatReviewResult.skippedCount > 0 && (
                <div className="rounded-lg border border-figma-border bg-figma-elevated/40 px-3 py-2">
                  <p className="text-[10px] text-figma-muted">
                    {repeatReviewResult.skippedCount} of {repeatReviewResult.totalCount} screen
                    {repeatReviewResult.totalCount !== 1 ? 's' : ''} already reviewed — evaluating
                    the rest
                  </p>
                </div>
              )}

            <ChatTimeline
              messages={messages}
              reportSegments={reportSegments}
              renderReportSegment={(segment) => (
                <ReportPanel
                  items={segment.items}
                  selectedId={selectedReportItemId}
                  appliedIds={appliedFindingIds}
                  dismissedIds={dismissedFindingIds}
                  hideApplied
                  onSelect={setSelectedReportItemId}
                  onDismiss={handleDismissFinding}
                  onFocusLayer={handleFocusReportLayer}
                />
              )}
            />

            {fixedItems.length > 0 && (
              <div className="rounded-lg border border-figma-border bg-figma-surface/70">
                <button
                  type="button"
                  onClick={() => setAppliedOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-figma-muted">
                    Applied ({fixedItems.length})
                  </span>
                  <span className="text-[12px] text-figma-muted">{appliedOpen ? '−' : '+'}</span>
                </button>
                {appliedOpen && (
                  <ul className="px-3 pb-3 flex flex-col gap-2">
                    {fixedItems.map((item) => (
                      <li key={`applied-${item.id}`}>
                        <button
                          type="button"
                          onClick={() => setSelectedReportItemId(item.id)}
                          className={`w-full rounded border px-2.5 py-2 text-left transition-colors ${
                            selectedReportItemId === item.id
                              ? 'border-[#14ae5c]/60 bg-[#14ae5c]/10'
                              : 'border-figma-border bg-figma-elevated/60 hover:border-[#14ae5c]/40'
                          }`}
                        >
                          <p className="text-[11px] font-medium text-figma-text">{item.title}</p>
                          <p className="text-[10px] text-figma-muted line-clamp-2 mt-0.5">
                            {item.detail}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {isThinking && (
              <ThinkingIndicator
                agentUiMode={agentUiMode}
                analyzingScreens={
                  agentUiMode === 'report' &&
                  selection != null &&
                  selection.totalTextLayers > 0 &&
                  reportItems.length === 0
                }
              />
            )}

            {aiError && !isThinking && (
              <ErrorBanner message={aiError} onDismiss={() => setAiError(null)} />
            )}

            {agentUiMode === 'suggestions' && suggestions.length > 0 && (
              <SuggestionCards
                suggestions={suggestions}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onDismiss={handleDismissSuggestion}
                dismissedIds={dismissedSuggestionIds}
                currentText={
                  selection
                    ? getLayerCharacters(selection, activeLayerId || selection.activeLayerId)
                    : undefined
                }
              />
            )}

            <div ref={bottomRef} />
          </div>

          {agentUiMode === 'suggestions' && suggestions.length > 0 && (
            <ReplaceButton
              disabled={!selectedSuggestion || replaceLoading || isThinking}
              loading={replaceLoading}
              success={replaceSuccess}
              error={replaceError}
              onReplace={handleReplace}
              onDismissError={() => setReplaceError(null)}
              variant="replace"
            />
          )}

          {reportItems.length > 0 && selectedReportItemId != null && (
            <ReplaceButton
              disabled={
                isThinking ||
                (reportFixMode === 'apply'
                  ? !canApplyReportFix || replaceLoading
                  : reportFixMode === 'revert'
                  ? replaceLoading
                  : true)
              }
              loading={replaceLoading}
              success={replaceSuccess}
              error={replaceError}
              onReplace={reportFixMode === 'revert' ? handleRevertFix : handleReplace}
              onDismissError={() => setReplaceError(null)}
              variant="fix"
              fixMode={reportFixMode}
              fixSuccessWasRevert={reportFixSuccessWasRevert}
              onApplyAll={handleApplyAll}
              onUndoAll={appliedFindingIds.length > 0 ? handleUndoAll : undefined}
              showBatchActions
            />
          )}

          <ChatInput
            onSend={handleSend}
            disabled={isThinking || replaceLoading || !evaluationMode}
            evaluationMode={evaluationMode}
            placeholder={chatPlaceholder}
          />
        </>
      )}

      {showHistoryNav && (
        <HistorySheet
          open={historyOpen}
          entries={savedChats}
          onClose={() => setHistoryOpen(false)}
          onSelect={handleRestoreFromHistory}
        />
      )}

      <ResizeHandle onMouseDown={handleResizeMouseDown} />
    </div>
  );
}
