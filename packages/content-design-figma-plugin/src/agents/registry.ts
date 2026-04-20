import type { EvaluationMode } from '../types';

/** How the primary work surface renders for this evaluation scope */
export type AgentUiMode = 'suggestions' | 'report' | 'chat';

export interface AgentDefinition {
  id: string;
  label: string;
  description: string;
  evaluationMode: EvaluationMode;
  uiMode: AgentUiMode;
  /** When set, chat/completions POST goes here instead of the default gateway base URL */
  customBaseUrl: string | null;
}

const GATEWAY_DEFAULT = 'https://llm-gateway.cbhq.net/v1';

/** Domains that must appear in manifest.json when any agent uses a custom base URL */
export function getCustomAgentDomains(): string[] {
  const urls = AGENTS.filter((a) => a.customBaseUrl).map((a) => a.customBaseUrl as string);
  const hosts = new Set<string>();
  for (const u of urls) {
    try {
      hosts.add(new URL(u).origin);
    } catch {
      /* ignore */
    }
  }
  return Array.from(hosts);
}

export const AGENTS: AgentDefinition[] = [
  {
    id: 'eval-full',
    label: 'Full evaluation',
    description: 'CDS compliance, content, and accessibility together',
    evaluationMode: 'full',
    uiMode: 'report',
    customBaseUrl: null,
  },
  {
    id: 'eval-cds',
    label: 'CDS compliance',
    description: 'Design-system copy and pattern compliance',
    evaluationMode: 'cds',
    uiMode: 'report',
    customBaseUrl: null,
  },
  {
    id: 'eval-content',
    label: 'Content',
    description: 'Voice, tone, and vocabulary for UI copy',
    evaluationMode: 'content',
    uiMode: 'suggestions',
    customBaseUrl: null,
  },
  {
    id: 'eval-a11y',
    label: 'Accessibility',
    description: 'Labels, clarity, and inclusive language for UI text',
    evaluationMode: 'a11y',
    uiMode: 'report',
    customBaseUrl: null,
  },
];

export function getAgentForEvaluationMode(mode: EvaluationMode): AgentDefinition {
  const found = AGENTS.find((a) => a.evaluationMode === mode);
  if (found) return found;
  return AGENTS.find((a) => a.evaluationMode === 'content')!;
}

export function getCompletionUrl(agent: AgentDefinition): string {
  if (agent.customBaseUrl) {
    return agent.customBaseUrl.endsWith('/chat/completions')
      ? agent.customBaseUrl
      : `${agent.customBaseUrl.replace(/\/$/, '')}/chat/completions`;
  }
  return `${GATEWAY_DEFAULT}/chat/completions`;
}
