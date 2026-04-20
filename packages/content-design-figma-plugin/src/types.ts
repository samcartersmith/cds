import type { EvaluationMode, MultiScreenSelection, TextLayerPayload } from "./shared/pluginTypes";

export type { EvaluationMode, MultiScreenSelection, TextLayerPayload };

/** @deprecated Legacy single-layer shape — use MultiScreenSelection */
export interface SelectionPayload {
  id: string;
  name: string;
  characters: string;
  hasMissingFont: boolean;
}

// ─── Plugin → UI messages ─────────────────────────────────────────────────────

export type PluginMessage =
  | {
      type: "INIT";
      apiKey: string | null;
      evaluationMode: EvaluationMode | null;
      selection: MultiScreenSelection | null;
      chatHistory: SavedChatSession[];
      fileName?: string;
    }
  | { type: "SELECTION_CHANGED"; selection: MultiScreenSelection | null }
  /** Sent when FOCUS_NODE could not select a canvas node (clears suppress-ref in UI) */
  | { type: "FOCUS_NODE_ABORTED" }
  | { type: "REPLACE_SUCCESS"; nodeId: string; newText: string }
  | { type: "REPLACE_ERROR"; error: string }
  | { type: "API_KEY_SAVED" }
  | { type: "API_KEY_CLEARED" }
  | { type: "EVALUATION_MODE_SAVED"; mode: EvaluationMode }
  | { type: "EVALUATION_MODE_CLEARED" };

// ─── UI → Plugin messages ─────────────────────────────────────────────────────

export type UIMessage =
  | { type: "UI_READY" }
  | { type: "FOCUS_NODE"; nodeId: string }
  | { type: "REPLACE"; nodeId: string; newText: string }
  | { type: "SAVE_API_KEY"; key: string }
  | { type: "CLEAR_API_KEY" }
  | { type: "SAVE_EVALUATION_MODE"; mode: EvaluationMode }
  | { type: "CLEAR_EVALUATION_MODE" }
  | { type: "SAVE_CHAT_HISTORY"; entries: SavedChatSession[] }
  | { type: "RESIZE"; width: number; height: number }
  | { type: "CLOSE" };

// ─── Chat / suggestions / report ───────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant";
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

export type ReportSeverity = "low" | "medium" | "high" | "blocker";

/** Buckets for full evaluation; CDS- and a11y-only modes omit this */
export type ReportFindingCategory = "cds" | "a11y" | "content";

export interface ReportItem {
  id: string;
  severity: ReportSeverity;
  /** Priority score where 10 is most urgent and 0 is least urgent */
  priority: number;
  title: string;
  detail: string;
  layerId?: string;
  /** Full replacement copy for the layer when applying a fix (use with layerId) */
  proposedText?: string;
  /** Set for full evaluation so findings can be grouped in the UI */
  category?: ReportFindingCategory;
}

/** Quality signal shown for full evaluation runs */
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

// ─── App state ────────────────────────────────────────────────────────────────

export type AppScreen =
  | "loading"
  | "api-key"
  | "settings"
  | "evaluation"
  | "no-selection"
  | "chat";
