import type {
  ChatMessage,
  EvaluationMode,
  ReportSegment,
  SavedChatSession,
  Suggestion,
} from "../types";
import { flattenReportItems } from "./reportSegments";

export const MAX_SAVED_CHATS = 5;

export function deriveChatTitle(messages: ChatMessage[]): string {
  const first = messages.find((m) => m.role === "user");
  if (!first?.text) return "Untitled";
  const t = first.text.trim();
  return t.length > 56 ? `${t.slice(0, 54)}…` : t;
}

export function formatSelectionLabel(selection: {
  screens: { id: string }[];
  totalTextLayers: number;
} | null): string {
  if (!selection) return "No selection";
  const n = selection.screens.length;
  const layers = selection.totalTextLayers;
  return `${n} screen${n === 1 ? "" : "s"} · ${layers} text layer${layers === 1 ? "" : "s"}`;
}

/** Merge a session into the list: same id replaces; newest first; cap at MAX_SAVED_CHATS */
export function upsertSavedChats(
  previous: SavedChatSession[],
  session: SavedChatSession
): SavedChatSession[] {
  const without = previous.filter((s) => s.id !== session.id);
  return [session, ...without].slice(0, MAX_SAVED_CHATS);
}

export function buildSavedSession(params: {
  id: string;
  evaluationMode: EvaluationMode;
  messages: ChatMessage[];
  suggestions: Suggestion[];
  reportSegments: ReportSegment[];
  selectionLabel: string;
  fileName?: string;
}): SavedChatSession {
  const reportItems = flattenReportItems(params.reportSegments).map((r) => ({ ...r }));
  const reportSegments = params.reportSegments.map((seg) => ({
    ...seg,
    items: seg.items.map((r) => ({ ...r })),
  }));
  return {
    id: params.id,
    savedAt: Date.now(),
    evaluationMode: params.evaluationMode,
    ...(params.fileName ? { fileName: params.fileName } : {}),
    title: deriveChatTitle(params.messages),
    messages: params.messages.map((m) => ({ ...m })),
    suggestions: params.suggestions.map((s) => ({ ...s })),
    reportItems,
    reportSegments,
    selectionLabel: params.selectionLabel,
  };
}
