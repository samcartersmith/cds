import type { ReportItem, ReportSegment, SavedChatSession } from "../types";
import { clampPriority, normalizeSeverity } from "./qualityScore";

function normalizeReportItem(item: ReportItem): ReportItem {
  return {
    ...item,
    severity: normalizeSeverity(item.severity),
    priority: clampPriority(item.priority),
  };
}

export function flattenReportItems(segments: ReportSegment[]): ReportItem[] {
  const out: ReportItem[] = [];
  for (const s of segments) {
    out.push(...s.items);
  }
  return out;
}

export function newReportSegment(
  anchorMessageIndex: number,
  items: ReportItem[],
  summary?: ReportSegment["summary"]
): ReportSegment {
  return {
    id: `rseg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    anchorMessageIndex,
    items: items.map(normalizeReportItem),
    ...(summary ? { summary } : {}),
  };
}

/** Restore segments from persisted session (new format or legacy flat reportItems) */
export function reportSegmentsFromSavedSession(entry: SavedChatSession): ReportSegment[] {
  if (entry.reportSegments && entry.reportSegments.length > 0) {
    return entry.reportSegments.map((s) => ({
      ...s,
      items: s.items.map((r) => normalizeReportItem({ ...r })),
    }));
  }
  if (entry.reportItems && entry.reportItems.length > 0) {
    let lastUser = -1;
    entry.messages.forEach((m, i) => {
      if (m.role === "user") lastUser = i;
    });
    const anchor = lastUser >= 0 ? lastUser : 0;
    return [
      {
        id: "migrated",
        anchorMessageIndex: anchor,
        items: entry.reportItems.map((r) => normalizeReportItem({ ...r })),
      },
    ];
  }
  return [];
}
