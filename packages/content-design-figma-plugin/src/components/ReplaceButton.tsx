interface ReplaceButtonProps {
  disabled: boolean;
  loading: boolean;
  success: boolean;
  error: string | null;
  onReplace: () => void;
  onDismissError: () => void;
  /** "replace" = content suggestions; "fix" = report finding */
  variant?: 'replace' | 'fix';
  /** Report finding: apply vs revert vs applied from history without snapshot */
  fixMode?: 'apply' | 'revert' | 'revert_unavailable';
  /** When true, success line shows "Done" (same regardless of direction) */
  fixSuccessWasRevert?: boolean;
  /** Apply all / Undo all batch actions */
  onApplyAll?: () => void;
  onUndoAll?: () => void;
  showBatchActions?: boolean;
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 7L5.5 10.5L12 3.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />;
}

export default function ReplaceButton({
  disabled,
  loading,
  success,
  error,
  onReplace,
  onDismissError,
  variant = 'replace',
  fixMode = 'apply',
  onApplyAll,
  onUndoAll,
  showBatchActions = false,
}: ReplaceButtonProps) {
  const isRevert = fixMode === 'revert';

  const primaryLabel = isRevert ? 'Undo' : 'Apply suggestion';
  const loadingLabel = isRevert ? 'Undoing…' : 'Applying…';

  return (
    <div className="shrink-0 px-3 py-2 border-t border-figma-border bg-figma-bg animate-slide-up">
      {error && (
        <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="flex-1 text-[10px] text-red-400 leading-snug">{error}</p>
          <button
            onClick={onDismissError}
            className="text-red-400/60 hover:text-red-400 transition-colors shrink-0"
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 1.5l7 7M8.5 1.5l-7 7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onReplace}
          disabled={disabled}
          className={`flex-1 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
            success
              ? 'bg-figma-green text-white shadow-[0_0_16px_#14ae5c40]'
              : loading
              ? 'bg-figma-purple/70 text-white cursor-not-allowed'
              : disabled
              ? 'bg-figma-surface border border-figma-border text-figma-muted cursor-not-allowed'
              : isRevert
              ? 'bg-figma-elevated border border-figma-border text-figma-text hover:border-figma-border/80 active:scale-[0.98]'
              : 'bg-figma-purple hover:bg-figma-purple-hover text-white shadow-[0_0_16px_#578BFA30] active:scale-[0.98]'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {success ? (
              <>
                <CheckIcon />
                Done
              </>
            ) : loading ? (
              <>
                <SpinnerIcon />
                {loadingLabel}
              </>
            ) : (
              <>
                {!isRevert && <CheckIcon />}
                {primaryLabel}
              </>
            )}
          </span>
        </button>

        {showBatchActions && (
          <div className="flex gap-1">
            {onApplyAll && (
              <button
                type="button"
                onClick={onApplyAll}
                disabled={loading}
                className="px-2.5 py-2 rounded-lg text-[11px] font-medium bg-figma-surface border border-figma-border text-figma-text hover:border-figma-purple/40 hover:text-figma-purple transition-colors disabled:opacity-40"
                title="Apply all suggestions"
              >
                Apply all
              </button>
            )}
            {onUndoAll && (
              <button
                type="button"
                onClick={onUndoAll}
                disabled={loading}
                className="px-2.5 py-2 rounded-lg text-[11px] font-medium bg-figma-surface border border-figma-border text-figma-muted hover:border-figma-border/80 transition-colors disabled:opacity-40"
                title="Undo all applied suggestions"
              >
                Undo all
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
