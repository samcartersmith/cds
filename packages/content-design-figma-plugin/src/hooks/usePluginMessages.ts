import { useEffect } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type {
  AppScreen,
  ChatMessage,
  EvaluationMode,
  MultiScreenSelection,
  PluginMessage,
  ReportItem,
  ReportSegment,
  SavedChatSession,
  Suggestion,
} from '../types';
import type { ReportReplaceOp } from './useReplaceState';

interface UsePluginMessagesParams {
  screen: AppScreen;
  isReportMode: boolean;
  setApiKey: Dispatch<SetStateAction<string | null>>;
  setEvaluationMode: Dispatch<SetStateAction<EvaluationMode | null>>;
  setSelection: Dispatch<SetStateAction<MultiScreenSelection | null>>;
  setSavedChats: Dispatch<SetStateAction<SavedChatSession[]>>;
  setCurrentFileName: Dispatch<SetStateAction<string | null>>;
  setActiveLayerId: Dispatch<SetStateAction<string>>;
  setScreen: Dispatch<SetStateAction<AppScreen>>;
  setSuggestions: Dispatch<SetStateAction<Suggestion[]>>;
  setReportSegments: Dispatch<SetStateAction<ReportSegment[]>>;
  setAppliedFindingIds: Dispatch<SetStateAction<string[]>>;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  setSelectedReportItemId: Dispatch<SetStateAction<string | null>>;
  setAiError: Dispatch<SetStateAction<string | null>>;
  setIsReportContextStale: Dispatch<SetStateAction<boolean>>;
  setReplaceLoading: Dispatch<SetStateAction<boolean>>;
  setReplaceSuccess: Dispatch<SetStateAction<boolean>>;
  setReplaceError: Dispatch<SetStateAction<string | null>>;
  setReplacedLayerId: Dispatch<SetStateAction<string | null>>;
  setReportFixSuccessWasRevert: Dispatch<SetStateAction<boolean>>;
  messagesRef: MutableRefObject<ChatMessage[]>;
  reportItemsRef: MutableRefObject<ReportItem[]>;
  focusFindingSuppressSelectionResetRef: MutableRefObject<boolean>;
  cancelAiRequest: () => void;
  revertPayloadByFindingIdRef: MutableRefObject<
    Record<string, { layerId: string; originalText: string }>
  >;
  replaceOperationRef: MutableRefObject<ReportReplaceOp>;
  lastReportFindingIdRef: MutableRefObject<string | null>;
  patchSelectionText: (
    sel: MultiScreenSelection,
    nodeId: string,
    newText: string,
  ) => MultiScreenSelection;
}

export function usePluginMessages({
  screen,
  isReportMode,
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
  messagesRef,
  reportItemsRef,
  focusFindingSuppressSelectionResetRef,
  cancelAiRequest,
  revertPayloadByFindingIdRef,
  replaceOperationRef,
  lastReportFindingIdRef,
  patchSelectionText,
}: UsePluginMessagesParams) {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const msg = (event.data?.pluginMessage ?? event.data) as PluginMessage;
      if (!msg?.type) return;

      switch (msg.type) {
        case 'INIT': {
          setApiKey(msg.apiKey);
          setEvaluationMode(msg.evaluationMode ?? null);
          setSelection(msg.selection);
          setSavedChats(Array.isArray(msg.chatHistory) ? msg.chatHistory : []);
          setCurrentFileName(
            typeof msg.fileName === 'string' && msg.fileName.length > 0 ? msg.fileName : null,
          );
          setIsReportContextStale(false);
          if (msg.selection?.activeLayerId) {
            setActiveLayerId(msg.selection.activeLayerId);
          }
          if (!msg.apiKey) {
            setScreen('api-key');
          } else {
            // Always start at L1 (evaluation picker) on new plugin open.
            setScreen('evaluation');
          }
          break;
        }

        case 'SELECTION_CHANGED': {
          const skipReportReset = focusFindingSuppressSelectionResetRef.current;
          focusFindingSuppressSelectionResetRef.current = false;
          cancelAiRequest();

          setSelection(msg.selection);
          if (!skipReportReset) {
            const hasThread = messagesRef.current.length > 0 || reportItemsRef.current.length > 0;
            const hasReport = reportItemsRef.current.length > 0;

            if (isReportMode && hasReport) {
              setIsReportContextStale(true);
              setSelectedReportItemId(null);
              setReplaceError(null);
              setReplaceSuccess(false);
              setReplacedLayerId(null);
            } else {
              if (msg.selection || !hasThread) {
                setSuggestions([]);
                setReportSegments([]);
                setAppliedFindingIds([]);
                revertPayloadByFindingIdRef.current = {};
                setSelectedId(null);
                setSelectedReportItemId(null);
                setAiError(null);
                setIsReportContextStale(false);
              }
              setReplaceError(null);
              setReplaceSuccess(false);
              setReplacedLayerId(null);
            }
          }

          if (msg.selection?.activeLayerId) {
            setActiveLayerId(msg.selection.activeLayerId);
          } else {
            setActiveLayerId('');
          }

          if (screen === 'chat' || screen === 'no-selection') {
            if (msg.selection) {
              setScreen('chat');
            } else {
              const keepThread =
                messagesRef.current.length > 0 || reportItemsRef.current.length > 0;
              setScreen(keepThread ? 'chat' : 'no-selection');
            }
          }
          break;
        }

        case 'FOCUS_NODE_ABORTED': {
          focusFindingSuppressSelectionResetRef.current = false;
          break;
        }

        case 'REPLACE_SUCCESS': {
          setReplaceLoading(false);
          setReplaceSuccess(true);
          setReplacedLayerId(msg.nodeId);
          setSelection((prev) => (prev ? patchSelectionText(prev, msg.nodeId, msg.newText) : prev));

          const op = replaceOperationRef.current;
          const findingId = lastReportFindingIdRef.current;
          replaceOperationRef.current = null;
          lastReportFindingIdRef.current = null;

          if (op === 'report-revert' && findingId) {
            setReportFixSuccessWasRevert(true);
            setAppliedFindingIds((prev) => prev.filter((id) => id !== findingId));
            delete revertPayloadByFindingIdRef.current[findingId];
          } else if (op === 'report-apply' && findingId) {
            setReportFixSuccessWasRevert(false);
            setAppliedFindingIds((prev) =>
              prev.includes(findingId) ? prev : [...prev, findingId],
            );
          } else {
            setReportFixSuccessWasRevert(false);
          }

          setTimeout(() => {
            setReplaceSuccess(false);
            setReplacedLayerId(null);
          }, 2500);
          break;
        }

        case 'REPLACE_ERROR': {
          setReplaceLoading(false);
          setReplaceError(msg.error);
          const op = replaceOperationRef.current;
          const findingId = lastReportFindingIdRef.current;
          if (op === 'report-apply' && findingId) {
            delete revertPayloadByFindingIdRef.current[findingId];
          }
          replaceOperationRef.current = null;
          lastReportFindingIdRef.current = null;
          break;
        }

        case 'API_KEY_SAVED': {
          setScreen((prev) => (prev === 'api-key' ? 'evaluation' : prev));
          break;
        }

        case 'API_KEY_CLEARED': {
          setApiKey(null);
          setEvaluationMode(null);
          setSavedChats([]);
          setCurrentFileName(null);
          setIsReportContextStale(false);
          setScreen('api-key');
          break;
        }

        case 'EVALUATION_MODE_SAVED': {
          setEvaluationMode(msg.mode);
          break;
        }

        case 'EVALUATION_MODE_CLEARED': {
          setEvaluationMode(null);
          break;
        }
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [
    cancelAiRequest,
    focusFindingSuppressSelectionResetRef,
    isReportMode,
    lastReportFindingIdRef,
    messagesRef,
    patchSelectionText,
    replaceOperationRef,
    reportItemsRef,
    revertPayloadByFindingIdRef,
    screen,
    setActiveLayerId,
    setAiError,
    setApiKey,
    setAppliedFindingIds,
    setEvaluationMode,
    setIsReportContextStale,
    setReplaceError,
    setReplaceLoading,
    setReplaceSuccess,
    setReplacedLayerId,
    setReportFixSuccessWasRevert,
    setReportSegments,
    setSavedChats,
    setCurrentFileName,
    setScreen,
    setSelectedId,
    setSelectedReportItemId,
    setSelection,
    setSuggestions,
  ]);
}
