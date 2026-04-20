interface ReplaceButtonProps {
  disabled: boolean;
  loading: boolean;
  success: boolean;
  error: string | null;
  onReplace: () => void;
  onDismissError: () => void;
  /** "replace" = content suggestions; "fix" = report finding */
  variant?: "replace" | "fix";
  /** Report finding: apply vs revert vs applied from history without snapshot */
  fixMode?: "apply" | "revert" | "revert_unavailable";
  /** When true, success line shows "Reverted" instead of "Layer updated" */
  fixSuccessWasRevert?: boolean;
}

export default function ReplaceButton({
  disabled,
  loading,
  success,
  error,
  onReplace,
  onDismissError,
  variant = "replace",
  fixMode = "apply",
  fixSuccessWasRevert = false,
}: ReplaceButtonProps) {
  const isFix = variant === "fix";
  const primaryLabel =
    isFix && fixMode === "revert"
      ? "Revert fix"
      : isFix && fixMode === "revert_unavailable"
      ? "Revert fix"
      : isFix
      ? "Apply fix"
      : "Replace content";
  const loadingLabel =
    isFix && fixMode === "revert" ? "Reverting…" : "Applying…";
  const successLabel =
    isFix && fixSuccessWasRevert ? "Reverted" : "Layer updated";
  const helperWhenReady =
    isFix && fixMode === "revert"
      ? "Restores the text from before this fix"
      : isFix && fixMode === "apply"
      ? "Will replace text on the selected finding's layer"
      : "Will overwrite the selected text layer";
  const helperWhenDisabled = isFix
    ? fixMode === "apply"
      ? "Choose a finding that has both a layer and suggested replacement text (see card hints)"
      : fixMode === "revert_unavailable"
      ? "Revert only works for fixes applied in this session"
      : null
    : null;

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

      <button
        onClick={onReplace}
        disabled={disabled}
        className={`w-full py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
          success
            ? "bg-figma-green text-white shadow-[0_0_16px_#14ae5c40]"
            : loading
            ? "bg-figma-purple/70 text-white cursor-not-allowed"
            : disabled
            ? "bg-figma-surface border border-figma-border text-figma-muted cursor-not-allowed"
            : fixMode === "revert"
            ? "bg-amber-600/90 hover:bg-amber-600 text-white shadow-[0_0_12px_rgba(217,119,6,0.25)] active:scale-[0.98]"
            : "bg-figma-purple hover:bg-figma-purple-hover text-white shadow-[0_0_16px_#578BFA30] active:scale-[0.98]"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {success ? (
            <>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7L5.5 10.5L12 3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {successLabel}
            </>
          ) : loading ? (
            <>
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {loadingLabel}
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 1H13V5M13 1L8 6M5 3H2C1.45 3 1 3.45 1 4V12C1 12.55 1.45 13 2 13H10C10.55 13 11 12.55 11 12V9"
                  stroke={disabled ? "#666" : "white"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {primaryLabel}
            </>
          )}
        </span>
      </button>

      {!success && !loading && (
        <p className="text-center text-[10px] text-figma-muted mt-1.5">
          {isFix
            ? disabled
              ? helperWhenDisabled
              : helperWhenReady
            : !disabled
            ? helperWhenReady
            : null}
        </p>
      )}
    </div>
  );
}
