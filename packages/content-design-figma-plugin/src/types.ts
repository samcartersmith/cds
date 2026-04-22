import type { EvaluationMode, MultiScreenSelection, TextLayerPayload } from './shared/pluginTypes';

export type { EvaluationMode, MultiScreenSelection, TextLayerPayload };

// ─── Plugin → UI messages ─────────────────────────────────────────────────────

export type PluginMessage =
  | {
      type: 'INIT';
      apiKey: string | null;
      evaluationMode: EvaluationMode | null;
      selection: MultiScreenSelection | null;
      chatHistory: SavedChatSession[];
      fileName?: string;
    }
  | { type: 'SELECTION_CHANGED'; selection: MultiScreenSelection | null }
  /** Sent when FOCUS_NODE could not select a canvas node (clears suppress-ref in UI) */
  | { type: 'FOCUS_NODE_ABORTED' }
  | { type: 'REPLACE_SUCCESS'; nodeId: string; newText: string }
  | { type: 'REPLACE_ERROR'; error: string }
  | { type: 'API_KEY_SAVED' }
  | { type: 'API_KEY_CLEARED' }
  | { type: 'EVALUATION_MODE_SAVED'; mode: EvaluationMode }
  | { type: 'EVALUATION_MODE_CLEARED' }
  | {
      type: 'REPEAT_REVIEW_CHECK';
      showInterstitial: boolean;
      lastReviewedAt: string | null;
      totalFrameCount: number;
      frameIdsToEvaluate: string[];
      partialSkip: boolean;
      evaluatedCount: number;
      totalCount: number;
      skippedCount: number;
    }
  | {
      type: 'REPLACE_SELECTION_TARGET';
      isSingleText: boolean;
      nodeId?: string;
      frameId?: string | null;
    };

// ─── UI → Plugin messages ─────────────────────────────────────────────────────

export type UIMessage =
  | { type: 'UI_READY' }
  | { type: 'FOCUS_NODE'; nodeId: string; frameId?: string }
  | { type: 'REPLACE'; nodeId: string; newText: string; frameId?: string }
  | { type: 'GET_REPLACE_SELECTION_TARGET' }
  | { type: 'SAVE_API_KEY'; key: string }
  | { type: 'CLEAR_API_KEY' }
  | { type: 'SAVE_EVALUATION_MODE'; mode: EvaluationMode }
  | { type: 'CLEAR_EVALUATION_MODE' }
  | { type: 'SAVE_CHAT_HISTORY'; entries: SavedChatSession[] }
  | { type: 'SAVE_REVIEW_SNAPSHOT'; scope: string; frameIds: string[] }
  | {
      type: 'CHECK_REPEAT_REVIEW';
      scope: string;
      frameIds: string[];
      ignoreStoredHashes?: boolean;
    }
  | { type: 'RESIZE'; width: number; height: number }
  | { type: 'CLOSE' };

// ─── Chat / suggestions / report ───────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  /** Unix ms when the message was added to the thread */
  sentAt?: number;
}

export interface Suggestion {
  id: string;
  text: string;
  label: string;
  tone: string;
}

export type ReportSeverity = 'low' | 'medium' | 'high' | 'blocker';

/** Buckets for full evaluation; CDS- and a11y-only modes omit this */
export type ReportFindingCategory = 'cds' | 'a11y' | 'content';

export interface ReportItem {
  id: string;
  severity: ReportSeverity;
  /** Priority score where 10 is most urgent and 0 is least urgent */
  priority: number;
  title: string;
  detail: string;
  /** The original text this finding refers to (as returned by the AI) */
  original?: string;
  layerId?: string;
  /** Full replacement copy for the layer when applying a suggestion (use with layerId) */
  proposedText?: string;
  /** Set for full evaluation so findings can be grouped in the UI */
  category?: ReportFindingCategory;
  /** Rule reference, e.g. "capitalization.sentence-case" */
  rule?: string;
}

/** Quality signal shown for full evaluation runs — retained for type compatibility */
export interface FullEvaluationSummary {
  /** Overall quality score where 5 is best */
  score: number;
  /** Two-sentence max summary of what went wrong */
  tldr: string;
}

/** Findings from one evaluation run, anchored after a specific user message index */
export interface ReportSegment {
  id: string;
  anchorMessageIndex: number;
  items: ReportItem[];
  /** Available for full evaluations */
  summary?: FullEvaluationSummary;
}

/** Persisted review session (max 5 in storage) */
export interface SavedChatSession {
  id: string;
  savedAt: number;
  evaluationMode: EvaluationMode;
  /** Figma file name at the time this session was saved */
  fileName?: string;
  title: string;
  messages: ChatMessage[];
  suggestions: Suggestion[];
  /** Flattened findings for backward compatibility; prefer reportSegments when present */
  reportItems: ReportItem[];
  /** When present, defines chronological placement of findings in the transcript */
  reportSegments?: ReportSegment[];
  selectionLabel: string;
}

// ─── Repeat review interstitial ───────────────────────────────────────────────

export interface RepeatReviewCheckResult {
  showInterstitial: boolean;
  lastReviewedAt: string | null;
  totalFrameCount: number;
  frameIdsToEvaluate: string[];
  partialSkip: boolean;
  evaluatedCount: number;
  totalCount: number;
  skippedCount: number;
}

// ─── App state ────────────────────────────────────────────────────────────────

export type AppScreen = 'loading' | 'api-key' | 'settings' | 'evaluation' | 'no-selection' | 'chat';
