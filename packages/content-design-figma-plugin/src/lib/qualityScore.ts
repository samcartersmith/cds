import type { FullEvaluationSummary, ReportItem, ReportSeverity } from "../types";

const SEVERITY_WEIGHT: Record<ReportSeverity, number> = {
  low: 1,
  medium: 2,
  high: 3.5,
  blocker: 5,
};

export function clampPriority(priority: unknown): number {
  const n = Number(priority);
  if (!Number.isFinite(n)) return 5;
  return Math.max(0, Math.min(10, Math.round(n)));
}

export function normalizeSeverity(severity: unknown): ReportSeverity {
  if (severity === "low" || severity === "medium" || severity === "high" || severity === "blocker") {
    return severity;
  }
  // Backward compatibility with legacy values.
  if (severity === "warning") return "high";
  if (severity === "info") return "low";
  return "medium";
}

function normalizeScore(score: unknown): number {
  const n = Number(score);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(5, Math.round(n)));
}

function trimToTwoSentences(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length === 0) return "";
  const parts = clean.match(/[^.!?]+[.!?]?/g)?.map((p) => p.trim()).filter(Boolean) ?? [];
  if (parts.length <= 2) return parts.join(" ");
  return `${parts[0]} ${parts[1]}`.trim();
}

function fallbackTldr(items: ReportItem[]): string {
  if (items.length === 0) {
    return "Overall quality is strong with no major issues found. Keep monitoring new screens for consistency.";
  }
  const blockers = items.filter((i) => i.severity === "blocker").length;
  const highs = items.filter((i) => i.severity === "high").length;
  const top = [...items].sort((a, b) => b.priority - a.priority)[0];
  const riskSentence =
    blockers > 0
      ? `The review found ${blockers} blocker issue${blockers === 1 ? "" : "s"} and ${highs} high-severity issue${highs === 1 ? "" : "s"}.`
      : `The review found ${highs} high-severity issue${highs === 1 ? "" : "s"} across the selected screens.`;
  const focusSentence = top
    ? `Start with "${top.title}" (priority ${top.priority}/10) to improve quality fastest.`
    : "Address the highest-priority findings first to raise the quality score.";
  return `${riskSentence} ${focusSentence}`;
}

export function computeQualityScore(items: ReportItem[]): number {
  if (items.length === 0) return 5;
  let penalty = 0;
  for (const item of items) {
    const priorityFactor = clampPriority(item.priority) / 10;
    const severityWeight = SEVERITY_WEIGHT[normalizeSeverity(item.severity)];
    penalty += priorityFactor * severityWeight * 0.4;
  }
  const score = 5 - penalty;
  return Math.max(0, Math.min(5, Math.round(score)));
}

export function normalizeOrBuildSummary(
  summary: unknown,
  items: ReportItem[]
): FullEvaluationSummary {
  if (summary && typeof summary === "object") {
    const s = summary as Record<string, unknown>;
    const normalized = {
      score: normalizeScore(s.score),
      tldr: trimToTwoSentences(typeof s.tldr === "string" ? s.tldr : ""),
    };
    if (normalized.tldr) {
      return normalized;
    }
  }
  return {
    score: computeQualityScore(items),
    tldr: trimToTwoSentences(fallbackTldr(items)),
  };
}
