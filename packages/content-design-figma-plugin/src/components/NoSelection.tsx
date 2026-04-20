export default function NoSelection() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-figma-elevated border border-figma-border flex items-center justify-center mb-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="#666" strokeWidth="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="#666" strokeWidth="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="#666" strokeWidth="1.5" />
          {/* Cursor pointing to the last box */}
          <path
            d="M16 16l5 5M16 16v4M16 16h4"
            stroke="#578BFA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="text-[13px] font-semibold text-figma-text mb-2 text-center">
        Select frame(s) or text
      </h3>
      <p className="text-[11px] text-figma-muted text-center leading-relaxed max-w-[220px]">
        Select one or more frames, sections, or text layers. The plugin collects all text in your
        selection.
      </p>

      <div className="mt-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-figma-border bg-figma-elevated/60">
        <span className="w-1.5 h-1.5 rounded-full bg-figma-muted/70 animate-pulse" aria-hidden />
        <p className="text-[10px] font-medium text-figma-muted uppercase tracking-wide">
          Waiting for selection
        </p>
      </div>
    </div>
  );
}
