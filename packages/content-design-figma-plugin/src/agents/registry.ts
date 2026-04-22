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
    label: 'Full evaluation',
    description: 'CDS compliance, content, and accessibility together',
    evaluationMode: 'full',
    uiMode: 'report',
  },
  {
    id: 'eval-cds',
    label: 'CDS compliance',
    description: 'Design-system copy and pattern compliance',
    evaluationMode: 'cds',
    uiMode: 'report',
  },
  {
    id: 'eval-content',
    label: 'Content',
    description: 'Voice, tone, and vocabulary for UI copy',
    evaluationMode: 'content',
    uiMode: 'suggestions',
  },
  {
    id: 'eval-a11y',
    label: 'Accessibility',
    description: 'Labels, clarity, and inclusive language for UI text',
    evaluationMode: 'a11y',
    uiMode: 'report',
  },
];

export function getAgentForEvaluationMode(mode: EvaluationMode): AgentDefinition {
  return AGENTS.find((a) => a.evaluationMode === mode) ?? AGENTS.find((a) => a.evaluationMode === 'content')!;
}
