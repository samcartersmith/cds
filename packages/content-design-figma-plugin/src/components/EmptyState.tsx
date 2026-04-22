import type { EvaluationMode } from '../types';
import type { AgentUiMode } from '../agents/registry';

interface EmptyStateProps {
  evaluationMode: EvaluationMode | null;
  agentUiMode: AgentUiMode;
}

function ContentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 6h12M4 10h8M4 14h6"
        stroke="#578BFA"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M14 12l4 4M16 12a2 2 0 11-4 0 2 2 0 014 0z"
        stroke="#578BFA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

function CdsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="#578BFA" strokeWidth="1.5" opacity="0.85" />
      <path
        d="M7 10l2 2 4-4"
        stroke="#578BFA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

function A11yIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="9" ry="5" stroke="#578BFA" strokeWidth="1.5" opacity="0.85" />
      <circle cx="10" cy="10" r="2" stroke="#578BFA" strokeWidth="1.5" opacity="0.85" />
    </svg>
  );
}

function FullIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2l2 5h5l-4 3 1.5 5L10 12 5.5 15 7 10 3 7h5L10 2z"
        stroke="#578BFA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

function ScopeIcon({ mode }: { mode: EvaluationMode | null }) {
  if (mode === 'content') return <ContentIcon />;
  if (mode === 'cds') return <CdsIcon />;
  if (mode === 'a11y') return <A11yIcon />;
  return <FullIcon />;
}

const SCOPE_HEADLINE: Record<string, string> = {
  content: 'Content review ready',
  cds: 'CDS compliance check ready',
  a11y: 'Accessibility check ready',
  full: 'Full review ready',
};

const SCOPE_BODY: Record<string, string> = {
  content: 'Ask for a rewrite, tone change, shorter version, or any copy tweak.',
  cds: 'Ask for a compliance check, list what to flag, or request a full pass.',
  a11y: 'Ask to find ambiguous labels, check inclusive language, or run a full pass.',
  full: 'Ask for a full review, rank top issues, or focus on a specific category.',
};

export default function EmptyState({ evaluationMode, agentUiMode }: EmptyStateProps) {
  const key = evaluationMode ?? 'full';
  const headline = SCOPE_HEADLINE[key] ?? 'Ready to review';
  const body =
    SCOPE_BODY[key] ??
    (agentUiMode === 'suggestions'
      ? 'Ask for a rewrite, shorter copy, a different tone, or anything else.'
      : 'Describe what you want reviewed or ask for a full pass on the selected screens.');

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 py-8 animate-fade-in">
      <div className="w-10 h-10 rounded-xl bg-figma-purple-dim border border-figma-purple/20 flex items-center justify-center">
        <ScopeIcon mode={evaluationMode} />
      </div>
      <div className="text-center">
        <p className="text-[12px] font-medium text-figma-text mb-1">{headline}</p>
        <p className="text-[11px] text-figma-muted leading-relaxed max-w-[210px]">{body}</p>
      </div>
    </div>
  );
}
