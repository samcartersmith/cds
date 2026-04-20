import type { EvaluationMode } from '../types';

interface EmptyStateProps {
  evaluationMode: EvaluationMode | null;
  agentUiMode: 'suggestions' | 'report' | 'chat';
}

export default function EmptyState({ evaluationMode, agentUiMode }: EmptyStateProps) {
  const modeLabel =
    evaluationMode === 'full'
      ? 'Full evaluation'
      : evaluationMode === 'cds'
      ? 'CDS compliance'
      : evaluationMode === 'a11y'
      ? 'Accessibility'
      : evaluationMode === 'content'
      ? 'Content'
      : 'Assistant';

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 py-8 animate-fade-in">
      <div className="w-10 h-10 rounded-xl bg-figma-purple-dim border border-figma-purple/20 flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path
            d="M17 10c0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7 7 3.13 7 7zM10 6v4l2.5 2.5"
            stroke="#578BFA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[12px] font-medium text-figma-text mb-1">{modeLabel}</p>
        <p className="text-[11px] text-figma-muted leading-relaxed max-w-[200px]">
          {agentUiMode === 'suggestions'
            ? 'Ask for a rewrite, shorter copy, a different tone, or anything else.'
            : 'Describe what you want reviewed or ask for a full pass on the selected screens.'}
        </p>
      </div>
    </div>
  );
}
