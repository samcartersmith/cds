import type {
  FullEvaluationSummary,
  ReportFindingCategory,
  ReportItem,
  ReportSeverity,
} from '../types';

interface ReportPanelProps {
  items: ReportItem[];
  summary?: FullEvaluationSummary;
  selectedId: string | null;
  /** Finding ids that have had Apply fix completed */
  appliedIds: string[];
  /** Hide applied findings from this panel (used with global fixed accordion) */
  hideApplied?: boolean;
  onSelect: (id: string | null) => void;
  /** Focus layer in canvas without changing selection for fix */
  onFocusLayer?: (layerId: string) => void;
}

const CATEGORY_ORDER: ReportFindingCategory[] = ['cds', 'a11y', 'content'];

const CATEGORY_LABEL: Record<ReportFindingCategory, string> = {
  cds: 'CDS usage',
  a11y: 'Accessibility',
  content: 'Content',
};

const SEVERITY_ORDER: Record<ReportSeverity, number> = {
  blocker: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const SEVERITY_BADGE_CLASS: Record<ReportSeverity, string> = {
  low: 'text-sky-300 bg-sky-500/10 border-sky-500/30',
  medium: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
  high: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
  blocker: 'text-red-300 bg-red-500/10 border-red-500/30',
};

function canApplyFixFromItem(item: ReportItem): boolean {
  return Boolean(
    item.layerId && item.proposedText != null && String(item.proposedText).trim().length > 0,
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FindingCheck({
  isSelected,
  isApplied,
  fixAvailable,
}: {
  isSelected: boolean;
  isApplied: boolean;
  fixAvailable: boolean;
}) {
  if (!fixAvailable && !isApplied) {
    return null;
  }
  if (isApplied) {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-[#14ae5c] bg-[#14ae5c]/20 text-[#14ae5c] pointer-events-none"
        role="img"
        aria-label="Fix applied"
      >
        <CheckIcon className="text-[#14ae5c]" />
      </span>
    );
  }
  if (isSelected) {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-figma-purple bg-figma-purple/15 text-figma-purple pointer-events-none"
        aria-hidden
      >
        <CheckIcon className="text-figma-purple" />
      </span>
    );
  }
  if (fixAvailable) {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-figma-border bg-figma-elevated pointer-events-none"
        title="Suggested replacement available"
        aria-hidden
      />
    );
  }
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-figma-muted/50 bg-transparent pointer-events-none"
      title="Guidance only — no automated replacement"
      aria-hidden
    />
  );
}

function FindingRow({
  item,
  selectedId,
  appliedIds,
  onSelect,
  onFocusLayer,
}: {
  item: ReportItem;
  selectedId: string | null;
  appliedIds: string[];
  onSelect: (id: string | null) => void;
  onFocusLayer?: (layerId: string) => void;
}) {
  const isSelected = selectedId === item.id;
  const isApplied = appliedIds.includes(item.id);
  const hasLayer = Boolean(item.layerId);
  const fixAvailable = canApplyFixFromItem(item);
  const canFocus = Boolean(item.layerId && onFocusLayer);
  const canSelect = fixAvailable || isApplied;

  const baseClass =
    item.severity === 'high' || item.severity === 'blocker'
      ? 'border-amber-500/35 bg-amber-500/5'
      : 'border-figma-border bg-figma-surface';

  const outlineClass =
    isApplied && isSelected
      ? 'ring-2 ring-white/75 border-white/90 bg-white/[0.09] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
      : isApplied
      ? 'ring-2 ring-[#14ae5c]/55 border-[#14ae5c]/50 bg-[#14ae5c]/[0.07]'
      : isSelected
      ? 'ring-1 ring-figma-purple/50 border-figma-purple/40'
      : '';

  const toggleSelection = () => {
    if (!canSelect) return;
    onSelect(isSelected ? null : item.id);
  };

  const inner = (
    <div className="flex gap-2.5 items-start min-w-0">
      <div className="pt-0.5 shrink-0">
        <FindingCheck isSelected={isSelected} isApplied={isApplied} fixAvailable={fixAvailable} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
              SEVERITY_BADGE_CLASS[item.severity]
            }`}
          >
            {item.severity}
          </span>
          <span className="inline-flex items-center rounded border border-figma-border bg-figma-elevated px-1.5 py-0.5 text-[9px] font-semibold text-figma-muted">
            Priority {item.priority}/10
          </span>
        </div>
        <p className="text-[12px] font-medium text-figma-text">{item.title}</p>
        <p className="text-[11px] text-figma-muted leading-relaxed mt-1">{item.detail}</p>

        {!isApplied && fixAvailable && (
          <p className="text-[9px] text-emerald-400/95 mt-1.5 leading-snug">
            Suggested replacement available — Apply fix is enabled when this finding is selected.
          </p>
        )}
        {!isApplied && hasLayer && !fixAvailable && (
          <p className="text-[9px] text-figma-muted mt-1.5 leading-snug">
            No automated replacement for this item (missing suggested text). Edit in Figma or ask a
            follow-up. You can still focus the layer below.
          </p>
        )}
        {!isApplied && !hasLayer && (
          <p className="text-[9px] text-figma-muted mt-1.5 leading-snug">
            General finding — not linked to a specific text layer. Apply fix and Focus are
            unavailable.
          </p>
        )}

        {item.proposedText && (
          <p
            className="text-[10px] text-figma-text/90 mt-2 line-clamp-2 leading-snug"
            title={item.proposedText}
          >
            <span className="text-figma-muted">Suggested: </span>
            {item.proposedText}
          </p>
        )}
        {item.layerId && (
          <p
            className="text-[9px] text-figma-muted/80 font-mono mt-1.5 truncate"
            title={item.layerId}
          >
            Layer: {item.layerId.slice(0, 12)}…
          </p>
        )}
        {canFocus && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFocusLayer!(item.layerId!);
            }}
            className="mt-2 text-[9px] font-medium text-figma-purple underline text-left"
          >
            Focus in canvas
          </button>
        )}
      </div>
    </div>
  );

  return (
    <li className="list-none">
      <div
        data-finding-card
        role={canSelect ? 'button' : undefined}
        tabIndex={canSelect ? 0 : -1}
        onClick={canSelect ? toggleSelection : undefined}
        onKeyDown={(e) => {
          if (!canSelect) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSelection();
          }
        }}
        className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
          canSelect
            ? 'cursor-pointer hover:border-figma-purple/30 hover:bg-figma-purple/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#578BFA]'
            : 'cursor-default'
        } ${baseClass} ${outlineClass}`}
        aria-pressed={canSelect ? isSelected : undefined}
        aria-label={
          !canSelect
            ? `${item.title} — guidance only`
            : isApplied && isSelected
            ? `${item.title} — fix applied, selected, press to deselect`
            : isApplied
            ? `${item.title} — fix applied`
            : isSelected
            ? `${item.title} — selected, press to deselect`
            : item.title
        }
      >
        {inner}
      </div>
    </li>
  );
}

function sortFindings(items: ReportItem[]): ReportItem[] {
  return [...items].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity];
  });
}

function FullQualitySummaryCard({ summary }: { summary: FullEvaluationSummary }) {
  return (
    <div className="rounded-lg border border-figma-purple/30 bg-figma-purple/10 p-3">
      <div className="flex items-end justify-between gap-3">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-figma-muted">
          Full evaluation quality
        </p>
        <p className="text-[12px] font-semibold text-figma-text">{summary.score}/5</p>
      </div>
      <p className="mt-1.5 text-[11px] text-figma-text/90 leading-relaxed">{summary.tldr}</p>
    </div>
  );
}

export default function ReportPanel({
  items,
  summary,
  selectedId,
  appliedIds,
  hideApplied = false,
  onSelect,
  onFocusLayer,
}: ReportPanelProps) {
  const visibleItems = hideApplied ? items.filter((i) => !appliedIds.includes(i.id)) : items;
  if (visibleItems.length === 0 && !summary) return null;
  if (visibleItems.length === 0 && summary) {
    return (
      <div className="flex flex-col gap-2 animate-fade-in">
        <FullQualitySummaryCard summary={summary} />
        <p className="text-[10px] text-figma-muted">No findings detected in this pass.</p>
      </div>
    );
  }

  const useGroupedSections = visibleItems.some((i) => i.category != null);

  if (!useGroupedSections) {
    const sortedItems = sortFindings(visibleItems);
    return (
      <div className="flex flex-col gap-2 animate-fade-in">
        {summary && <FullQualitySummaryCard summary={summary} />}
        <p className="text-[10px] font-medium text-figma-muted uppercase tracking-wider px-0.5">
          Findings
        </p>
        <ul className="flex flex-col gap-2">
          {sortedItems.map((item) => (
            <FindingRow
              key={item.id}
              item={item}
              selectedId={selectedId}
              appliedIds={appliedIds}
              onSelect={onSelect}
              onFocusLayer={onFocusLayer}
            />
          ))}
        </ul>
      </div>
    );
  }

  const byCategory = new Map<ReportFindingCategory, ReportItem[]>();
  const uncategorized: ReportItem[] = [];
  for (const item of visibleItems) {
    if (item.category) {
      const list = byCategory.get(item.category) ?? [];
      list.push(item);
      byCategory.set(item.category, list);
    } else {
      uncategorized.push(item);
    }
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {summary && <FullQualitySummaryCard summary={summary} />}
      <p className="text-[10px] font-medium text-figma-muted uppercase tracking-wider px-0.5">
        Findings
      </p>

      {uncategorized.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold text-figma-text px-0.5">Other</p>
          <ul className="flex flex-col gap-2">
            {sortFindings(uncategorized).map((item) => (
              <FindingRow
                key={item.id}
                item={item}
                selectedId={selectedId}
                appliedIds={appliedIds}
                onSelect={onSelect}
                onFocusLayer={onFocusLayer}
              />
            ))}
          </ul>
        </div>
      )}

      {CATEGORY_ORDER.map((cat) => {
        const group = byCategory.get(cat);
        if (!group || group.length === 0) return null;
        return (
          <div key={cat} className="flex flex-col gap-2">
            <p className="text-[10px] font-semibold text-figma-text px-0.5">
              {CATEGORY_LABEL[cat]}
            </p>
            <ul className="flex flex-col gap-2">
              {sortFindings(group).map((item) => (
                <FindingRow
                  key={`${cat}-${item.id}`}
                  item={item}
                  selectedId={selectedId}
                  appliedIds={appliedIds}
                  onSelect={onSelect}
                  onFocusLayer={onFocusLayer}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
