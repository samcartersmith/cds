import { getAgentForEvaluationMode, ANTHROPIC_MESSAGES_URL } from "../agents/registry";
import type {
  ChatMessage,
  EvaluationMode,
  FullEvaluationSummary,
  MultiScreenSelection,
  ReportFindingCategory,
  ReportItem,
  ReportSeverity,
  Suggestion,
} from "../types";
import { clampPriority, normalizeOrBuildSummary, normalizeSeverity } from "./qualityScore";
import { SKILLS_SYSTEM_PROMPT, SKILL_MAP, PRODUCT_MODULE_MAP } from "../skills";

const GATEWAY_MODEL = "claude-sonnet-4";

// ─── Format selection for model context ───────────────────────────────────────

const NO_CANVAS_CONTEXT = "(No Figma selection — no live screen text.)";

export function formatMultiScreenContext(selection: MultiScreenSelection | null): string {
  if (!selection || selection.screens.length === 0 || selection.totalTextLayers === 0) {
    return NO_CANVAS_CONTEXT;
  }
  const parts: string[] = [];
  for (const screen of selection.screens) {
    parts.push(`## ${screen.name}`);
    for (const layer of screen.layers) {
      parts.push(
        `- [${layer.id}] ${layer.name}: "${layer.characters.replace(/"/g, '\\"')}"${
          layer.hasMissingFont ? " (missing font)" : ""
        }`
      );
    }
  }
  return parts.join("\n");
}

function getActiveLayerText(selection: MultiScreenSelection | null, activeLayerId: string): string {
  if (!selection || selection.screens.length === 0) return "";
  for (const screen of selection.screens) {
    for (const layer of screen.layers) {
      if (layer.id === activeLayerId) return layer.characters;
    }
  }
  return selection.screens[0]?.layers[0]?.characters ?? "";
}

/** Compact JSON for follow-up questions about existing findings */
function formatReportItemsForContext(items: ReportItem[]): string {
  if (items.length === 0) return "";
  const slim = items.map((r) => ({
    id: r.id,
    severity: r.severity,
    priority: r.priority,
    title: r.title,
    detail: r.detail,
    ...(r.category ? { category: r.category } : {}),
    ...(r.layerId ? { layerId: r.layerId } : {}),
    ...(r.proposedText ? { proposedText: r.proposedText } : {}),
  }));
  return JSON.stringify(slim);
}

// ─── System prompts by evaluation mode ───────────────────────────────────────

// Skills rules are delivered on demand via tool calls — only the orchestration
// instructions from 00-system.md are sent as the system prompt.
const CONTENT_SYSTEM = SKILLS_SYSTEM_PROMPT;

const REPORT_SYSTEM_FULL = `You are a design QA assistant for a Figma plugin. Given structured UI text from one or more screens, analyze and split findings into exactly three groups:

1) **cds** — CDS / design-system usage (labels, patterns, terminology, consistency)
2) **a11y** — Accessibility of the copy (directional language, vague links, clarity for screen readers)
3) **content** — Content quality (voice, tone, clarity, vocabulary)

Respond with JSON only (each array may be empty if nothing to flag in that area). Each finding uses this shape:
{"id":"string","severity":"low"|"medium"|"high"|"blocker","priority":0-10,"title":"string","detail":"string","layerId":"node id from context if applicable","proposedText":"exact full replacement string for that TEXT layer"}

Rules: Whenever you include "layerId", you MUST include "proposedText" — the complete new text for that layer (not a fragment). If you cannot propose concrete replacement copy, omit both layerId and proposedText and describe the issue only in title/detail. Same shape for cds, a11y, and content arrays.

Also include a top-level summary object:
{"summary":{"score":0-5,"tldr":"max two sentences describing what went wrong"}}
Score should decrease as high-severity + high-priority issues increase. 5 means very few issues.

Use at most 12 findings total across all sections unless the user asks for exhaustive review. Put each finding in only one category.`;

const REPORT_SYSTEM_CDS = `You are a CDS compliance assistant for a Figma plugin. Given UI text from selected screens, flag design-system and copy pattern issues (terminology, labels, consistency).

Respond with JSON only. Each item:
{"id":"string","severity":"low"|"medium"|"high"|"blocker","priority":0-10,"title":"string","detail":"string","layerId":"node id from context if applicable","proposedText":"exact full replacement string for that TEXT layer"}

Whenever you include layerId, you MUST include proposedText (complete new text for that layer). If you cannot propose concrete copy, omit layerId and proposedText.

{"items":[...]}
Max 10 items unless asked otherwise.`;

const REPORT_SYSTEM_A11Y = `You are an accessibility copy assistant for a Figma plugin. Given UI text from selected screens, flag accessibility-related copy issues (ambiguous links, directional language, clarity, redundant words).

Respond with JSON only. Each item:
{"id":"string","severity":"low"|"medium"|"high"|"blocker","priority":0-10,"title":"string","detail":"string","layerId":"node id from context if applicable","proposedText":"exact full replacement string for that TEXT layer"}

Whenever you include layerId, you MUST include proposedText (complete new text for that layer). If you cannot propose concrete copy, omit layerId and proposedText.

{"items":[...]}
Max 10 items unless asked otherwise.`;

/** Appended when the UI already has findings — allows Q&A without replacing the list */
const REPORT_FOLLOWUP_APPENDIX = `

## Follow-up messages (findings already listed above)
When the user asks a question, wants clarification, or discusses existing findings — and they are **not** asking you to re-run the full evaluation or produce a fresh findings list — respond with JSON only in this exact shape:
{"assistantReply":"<your answer>"}

When they ask to re-evaluate, refresh findings, add new issues, or run another pass, use the normal report JSON format for this evaluation mode (items or cds/a11y/content arrays), not assistantReply.`;

function systemPromptForMode(mode: EvaluationMode): string {
  switch (mode) {
    case "content":
      return CONTENT_SYSTEM;
    case "full":
      return REPORT_SYSTEM_FULL;
    case "cds":
      return REPORT_SYSTEM_CDS;
    case "a11y":
      return REPORT_SYSTEM_A11Y;
    default:
      return CONTENT_SYSTEM;
  }
}

// ─── JSON extraction ─────────────────────────────────────────────────────────

function extractJson(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1) return raw.slice(start, end + 1);
  return raw.trim();
}

export interface AgentCompletionResultSuggestions {
  kind: "suggestions";
  suggestions: Suggestion[];
}

export interface AgentCompletionResultReport {
  kind: "report";
  items: ReportItem[];
  summary?: FullEvaluationSummary;
}

/** Conversational reply in report mode; existing findings stay visible */
export interface AgentCompletionResultChat {
  kind: "chat";
  text: string;
}

export type AgentCompletionResult =
  | AgentCompletionResultSuggestions
  | AgentCompletionResultReport
  | AgentCompletionResultChat;

// ─── Tool calling types ───────────────────────────────────────────────────────

interface TextContentBlock { type: 'text'; text: string }
interface ToolUseContentBlock { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
interface ToolResultContentBlock { type: 'tool_result'; tool_use_id: string; content: string }
type ContentBlock = TextContentBlock | ToolUseContentBlock | ToolResultContentBlock;

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string | ContentBlock[];
}

interface AnthropicToolResponse {
  content: ContentBlock[];
  stop_reason: string;
}

interface AnthropicTool {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, { type: string; enum?: string[]; description?: string }>;
    required: string[];
  };
}

// ─── Tool definitions ─────────────────────────────────────────────────────────

const CONTENT_TOOLS: AnthropicTool[] = [
  {
    name: 'get_skill',
    description:
      'Look up content design guidelines for a specific category. Call this before checking copy against rules in that category.',
    input_schema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: Object.keys(SKILL_MAP),
          description: 'The guideline category to retrieve.',
        },
      },
      required: ['category'],
    },
  },
  {
    name: 'get_product_module',
    description:
      'Look up product-specific content overrides. Call this when the screen context indicates a specific Coinbase product area. These overrides may supersede the general guidelines.',
    input_schema: {
      type: 'object',
      properties: {
        product: {
          type: 'string',
          enum: Object.keys(PRODUCT_MODULE_MAP),
          description: 'The product area to retrieve overrides for.',
        },
      },
      required: ['product'],
    },
  },
];

// ─── Tool executor ────────────────────────────────────────────────────────────

function executeSkillTool(name: string, input: Record<string, unknown>): string {
  if (name === 'get_skill') {
    const category = input.category as string;
    return SKILL_MAP[category] ?? `No guidelines found for category "${category}".`;
  }
  if (name === 'get_product_module') {
    const product = input.product as string;
    return PRODUCT_MODULE_MAP[product] ?? `No product module found for "${product}".`;
  }
  return `Unknown tool: ${name}`;
}

// ─── Multi-turn tool-calling loop ─────────────────────────────────────────────

async function runWithToolCalling(
  apiKey: string,
  system: string,
  initialMessages: AnthropicMessage[],
  signal: AbortSignal,
  maxRounds = 8,
): Promise<string> {
  const messages = [...initialMessages];

  for (let round = 0; round < maxRounds; round++) {
    const res = await fetch(ANTHROPIC_MESSAGES_URL, {
      method: 'POST',
      signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: GATEWAY_MODEL,
        system,
        messages,
        tools: CONTENT_TOOLS,
        max_tokens: 4000,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      if (res.status === 401) throw new Error('Invalid API key. Check your LLM Gateway key in settings.');
      if (res.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.');
      throw new Error(`Gateway error ${res.status}: ${text.slice(0, 200)}`);
    }

    const data = (await res.json()) as AnthropicToolResponse;

    if (data.stop_reason === 'end_turn') {
      return data.content.find((b): b is TextContentBlock => b.type === 'text')?.text ?? '';
    }

    if (data.stop_reason === 'tool_use') {
      messages.push({ role: 'assistant', content: data.content });

      const toolResults: ToolResultContentBlock[] = data.content
        .filter((b): b is ToolUseContentBlock => b.type === 'tool_use')
        .map((b) => ({
          type: 'tool_result',
          tool_use_id: b.id,
          content: executeSkillTool(b.name, b.input),
        }));

      messages.push({ role: 'user', content: toolResults });
      continue;
    }

    // max_tokens or unexpected — return whatever text we have
    const partial = data.content.find((b): b is TextContentBlock => b.type === 'text')?.text ?? '';
    if (partial) return partial;
    throw new Error('Unexpected response from model. Please try again.');
  }

  throw new Error('The review took too many steps to complete. Please try again.');
}

// ─── Skills-format findings helpers ──────────────────────────────────────────

interface SkillsFinding {
  layerId?: string;
  layerName?: string;
  original?: string;
  category?: string;
  severity?: string;
  title?: string;
  detail?: string;
  rule?: string;
  proposedText?: string | null;
}

interface SkillsSummary {
  layers_reviewed?: number;
  errors?: number;
  warnings?: number;
  suggestions?: number;
  pass_rate?: string;
}

function skillsSeverityToReportSeverity(raw: string | undefined): ReportSeverity {
  if (raw === 'error') return 'high';
  if (raw === 'warning') return 'medium';
  return 'low';
}

function skillsSeverityToPriority(raw: string | undefined): number {
  if (raw === 'error') return 8;
  if (raw === 'warning') return 5;
  return 2;
}

function skillsCategoryToReportCategory(raw: string | undefined): ReportFindingCategory | undefined {
  if (raw === 'accessibility') return 'a11y';
  if (raw === 'component-pattern') return 'cds';
  if (raw) return 'content';
  return undefined;
}

function skillsSummaryToEvalSummary(
  raw: SkillsSummary | undefined,
  items: ReportItem[],
): FullEvaluationSummary {
  const errors = raw?.errors ?? items.filter((i) => i.severity === 'high' || i.severity === 'blocker').length;
  const warnings = raw?.warnings ?? items.filter((i) => i.severity === 'medium').length;
  const score = Math.max(0, Math.min(5, 5 - errors - Math.floor(warnings / 2)));
  const passRatePart = raw?.pass_rate ? ` Pass rate: ${raw.pass_rate}.` : '';
  const tldr = `${errors} error${errors !== 1 ? 's' : ''}, ${warnings} warning${warnings !== 1 ? 's' : ''} found.${passRatePart}`;
  return { score, tldr };
}

function parseSkillsFindings(parsed: Record<string, unknown>): AgentCompletionResultReport {
  const findings = parsed.findings as SkillsFinding[];
  const items: ReportItem[] = findings.map((f, i) => ({
    id: f.layerId ? `r-${f.layerId}-${i}` : `r-${Date.now()}-${i}`,
    severity: skillsSeverityToReportSeverity(f.severity),
    priority: skillsSeverityToPriority(f.severity),
    title: f.title ?? 'Finding',
    detail: f.detail ?? '',
    layerId: f.layerId,
    proposedText:
      typeof f.proposedText === 'string' && f.proposedText.length > 0 ? f.proposedText : undefined,
    category: skillsCategoryToReportCategory(f.category),
  }));
  const summary = skillsSummaryToEvalSummary(parsed.summary as SkillsSummary | undefined, items);
  return { kind: 'report', items, summary };
}

export async function runAgentCompletion(
  apiKey: string,
  evaluationMode: EvaluationMode,
  selection: MultiScreenSelection | null,
  activeLayerId: string,
  userPrompt: string,
  history: ChatMessage[],
  reportItemsForContext?: ReportItem[],
  signal?: AbortSignal,
): Promise<AgentCompletionResult> {
  const agent = getAgentForEvaluationMode(evaluationMode);
  const hasReportFindingsContext =
    agent.uiMode === "report" &&
    reportItemsForContext != null &&
    reportItemsForContext.length > 0;
  const system =
    systemPromptForMode(evaluationMode) +
    (hasReportFindingsContext ? REPORT_FOLLOWUP_APPENDIX : "");
  const context = formatMultiScreenContext(selection);
  const activeText = getActiveLayerText(selection, activeLayerId);
  const findingsBlock =
    agent.uiMode === "report" &&
    reportItemsForContext &&
    reportItemsForContext.length > 0
      ? `\n\nCurrent findings (for follow-up questions; same JSON shape the UI shows):\n${formatReportItemsForContext(reportItemsForContext)}`
      : "";

  // ── Suggestions (content) mode: tool-calling path ───────────────────────────

  function tryReportFollowupAssistantReply(
    parsed: unknown
  ): AgentCompletionResultChat | null {
    if (!hasReportFindingsContext || !parsed || typeof parsed !== "object") return null;
    const o = parsed as Record<string, unknown>;
    const reply = o.assistantReply;
    if (typeof reply !== "string" || reply.trim().length === 0) return null;
    const hasItems = Array.isArray(o.items) && o.items.length > 0;
    const hasBuckets = ["cds", "a11y", "content"].some(
      (k) => Array.isArray(o[k]) && (o[k] as unknown[]).length > 0
    );
    if (hasItems || hasBuckets) return null;
    return { kind: "chat", text: reply.trim() };
  }

  if (agent.uiMode === "suggestions") {
    const toolMessages: AnthropicMessage[] = [
      ...history.map((msg) => ({ role: msg.role as 'user' | 'assistant', content: msg.text })),
      {
        role: 'user' as const,
        content: `Multi-screen context:\n${context}\n\nPrimary layer (apply suggestions to this text unless the request implies otherwise): "${activeText}"${findingsBlock}\n\nRequest: ${userPrompt}`,
      },
    ];

    let raw: string;
    try {
      raw = await runWithToolCalling(apiKey, system, toolMessages, signal ?? new AbortController().signal);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'Network request failed.';
      throw new Error(reason);
    }

    const jsonStr = extractJson(raw);
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonStr) as unknown;
    } catch {
      throw new Error("The model returned an unexpected format. Please try again.");
    }

    if (parsed && typeof parsed === "object") {
      const o = parsed as Record<string, unknown>;

      // Follow-up conversational reply (skills prompt: { assistantReply: "..." })
      if (typeof o.assistantReply === "string" && o.assistantReply.trim().length > 0) {
        return { kind: "chat", text: o.assistantReply.trim() };
      }

      // Skills-format review result: { findings: [...], summary: {...} }
      if (Array.isArray(o.findings)) {
        return parseSkillsFindings(o);
      }

      // Standard suggestions: { suggestions: [...] }
      if (Array.isArray(o.suggestions)) {
        if (o.suggestions.length === 0) {
          throw new Error("No suggestions returned. Please try rephrasing your request.");
        }
        type RawSuggestion = { text?: string; label?: string; rationale?: string; tone?: string };
        return {
          kind: "suggestions",
          suggestions: (o.suggestions as RawSuggestion[]).map((s, i) => ({
            id: `s-${Date.now()}-${i}`,
            text: s.text ?? "",
            label: s.label ?? "Option",
            tone: s.rationale ?? s.tone ?? "",
          })),
        };
      }
    }

    throw new Error("The model returned an unexpected format. Please try again.");
  }

  // ── Report modes: single fetch path ─────────────────────────────────────────

  const reportMessages: Array<{ role: string; content: string }> = [
    ...history.map((msg) => ({ role: msg.role, content: msg.text })),
    {
      role: "user",
      content: `Screen and layer context:\n${context}${findingsBlock}\n\nRequest: ${userPrompt}`,
    },
  ];

  let reportRes: Response;
  try {
    reportRes = await fetch(ANTHROPIC_MESSAGES_URL, {
      method: "POST",
      signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: GATEWAY_MODEL,
        system,
        messages: reportMessages,
        temperature: 0.4,
        max_tokens: 2000,
      }),
    });
  } catch (err) {
    const reason = err instanceof Error && err.message ? err.message : "Network request failed.";
    throw new Error(
      `Could not reach the Anthropic proxy at ${ANTHROPIC_MESSAGES_URL}. Check VPN/internal network access and try again. (${reason})`
    );
  }

  if (!reportRes.ok) {
    const text = await reportRes.text().catch(() => "");
    if (reportRes.status === 401) throw new Error("Invalid API key. Check your LLM Gateway key in settings.");
    if (reportRes.status === 429) throw new Error("Rate limit reached. Please wait a moment and try again.");
    throw new Error(`Gateway error ${reportRes.status}: ${text.slice(0, 200)}`);
  }

  interface ReportModeResponse {
    content: Array<{ type: string; text?: string }>;
  }
  const reportData = (await reportRes.json()) as ReportModeResponse;
  const reportRaw = reportData.content?.find((b) => b.type === "text")?.text ?? "";
  const jsonStr = extractJson(reportRaw);

  interface RawFinding {
    id?: string;
    severity?: string;
    priority?: number;
    title?: string;
    detail?: string;
    layerId?: string;
    proposedText?: string;
  }

  function mapRawToReportItem(
    it: RawFinding,
    index: number,
    category?: ReportFindingCategory
  ): ReportItem {
    const layerId = it.layerId;
    const proposedText =
      typeof it.proposedText === "string" && it.proposedText.length > 0 ? it.proposedText : undefined;
    return {
      id: it.id ?? `r-${Date.now()}-${index}`,
      severity: normalizeSeverity(it.severity),
      priority: clampPriority(it.priority),
      title: it.title ?? "Finding",
      detail: it.detail ?? "",
      layerId,
      proposedText: layerId ? proposedText : undefined,
      ...(category ? { category } : {}),
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr) as unknown;
  } catch {
    if (hasReportFindingsContext && reportRaw.trim().length > 0) {
      return { kind: "chat", text: reportRaw.trim() };
    }
    throw new Error("The model returned an unexpected format. Please try again.");
  }

  const followupChat = tryReportFollowupAssistantReply(parsed);
  if (followupChat) return followupChat;

  let items: ReportItem[];

  if (evaluationMode === "full" && parsed && typeof parsed === "object") {
    const o = parsed as Record<string, unknown>;
    const hasBuckets = ["cds", "a11y", "content"].some((k) => Array.isArray(o[k]));
    if (hasBuckets) {
      const order: ReportFindingCategory[] = ["cds", "a11y", "content"];
      let idx = 0;
      items = [];
      for (const cat of order) {
        const arr = o[cat];
        if (!Array.isArray(arr)) continue;
        for (const raw of arr) {
          items.push(mapRawToReportItem(raw as RawFinding, idx++, cat));
        }
      }
      const summary = normalizeOrBuildSummary(o.summary, items);
      return { kind: "report", items, summary };
    }
  }

  const parsedReport = parsed as { items?: RawFinding[] };
  if (!Array.isArray(parsedReport.items)) {
    throw new Error("No report items returned. Please try rephrasing your request.");
  }
  items = parsedReport.items.map((it, i) => mapRawToReportItem(it, i));
  if (evaluationMode === "full" && parsed && typeof parsed === "object") {
    const summary = normalizeOrBuildSummary((parsed as Record<string, unknown>).summary, items);
    return { kind: "report", items, summary };
  }
  return { kind: "report", items };
}
