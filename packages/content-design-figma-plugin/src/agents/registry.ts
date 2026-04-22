import type { EvaluationMode } from '../types';

/** How the primary work surface renders for this evaluation scope */
export type AgentUiMode = 'suggestions' | 'report';

export interface AgentDefinition {
  id: string;
  label: string;
  description: string;
  evaluationMode: EvaluationMode;
  uiMode: AgentUiMode;
}

/** Native Anthropic messages endpoint via the internal proxy */
export const ANTHROPIC_MESSAGES_URL = 'https://llm-gateway.cbhq.net/v1/messages';

export const AGENTS: AgentDefinition[] = [
  {
    id: 'eval-full',
    label: 'Full review',
    description: 'Checks CDS patterns, content quality, and accessibility in one pass',
    evaluationMode: 'full',
    uiMode: 'report',
  },
  {
    id: 'eval-cds',
    label: 'CDS compliance',
    description: 'Flags copy that doesn't match Coinbase design system patterns',
    evaluationMode: 'cds',
    uiMode: 'report',
  },
  {
    id: 'eval-content',
    label: 'Content',
    description: 'Suggests rewrites for voice, tone, and vocabulary',
    evaluationMode: 'content',
    uiMode: 'suggestions',
  },
  {
    id: 'eval-a11y',
    label: 'Accessibility',
    description: 'Finds ambiguous labels and inclusive language issues',
    evaluationMode: 'a11y',
    uiMode: 'report',
  },
];

export function getAgentForEvaluationMode(mode: EvaluationMode): AgentDefinition {
  return AGENTS.find((a) => a.evaluationMode === mode) ?? AGENTS.find((a) => a.evaluationMode === 'content')!;
}
