import { useState, useCallback } from 'react';
import type {
  ReportFindingCategory,
  ReportItem,
  ReportSeverity,
} from '../types';

interface ReportPanelProps {
  items: ReportItem[];
  selectedId: string | null;
  /** Finding ids that have had Apply suggestion completed */
  appliedIds: string[];
  /** Finding ids that have been dismissed */
  dismissedIds: string[];
  /** Hide applied findings from this panel (used with global applied accordion) */
  hideApplied?: boolean;
  onSelect: (id: string | null) => void;
  onDismiss: (id: string) => void;
  /** Focus layer in canvas without changing selection for fix */
  onFocusLayer?: (layerId: string, frameId?: string) => void;
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

const SEVERITY_LABEL: Record<ReportSeverity, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  blocker: 'Blocker',
};

function canApplyFromItem(item: ReportItem): boolean {
  return Boolean(
    item.layerId && item.proposedText != null && String(item.proposedText).trim().length > 0,
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DismissIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M1.5 1.5l7 7M8.5 1.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
    >
      <path
        d="M2 3.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FindingRow({
  item,
  selectedId,
  appliedIds,
  onSelect,
  onDismiss,
  onFocusLayer,
}: {
  item: ReportItem;
  selectedId: string | null;
  appliedIds: string[];
  onSelect: (id: string | null) => void;
  onDismiss: (id: string) => void;
  onFocusLayer?: (layerId: string, frameId?: string) => void;
}) {
  const isSelected = selectedId === item.id;
  const isApplied = appliedIds.includes(item.id);
  const fixAvailable = canApplyFromItem(item);
  const canSelect = fixAvailable || isApplied;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const text = item.proposedText ?? '';
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    },
    [item.proposedText],
  );

  const handleDismiss = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss(item.id);
    },
    [item.id, onDismiss],
  );

  const toggleSelection = () => {
    if (!canSelect) return;
    onSelect(isSelected ? null : item.id);
  };

  const baseClass =
    item.severity === 'high' || item.severity === 'blocker'
      ? 'border-amber-500/35 bg-amber-500/5'
      : 'border-figma-border bg-figma-surface';

  const outlineClass = isApplied && isSelected
    ? 'ring-2 ring-white/75 border-white/90 bg-white/[0.09]'
    : isApplied
    ? 'ring-2 ring-[#14ae5c]/55 border-[#14ae5c]/50 bg-[#14ae5c]/[0.07]'
    : isSelected
    ? 'ring-1 ring-figma-purple/50 border-figma-purple/40'
    : '';

  const hasOriginal = Boolean(item.original);
  const hasProposed = Boolean(item.proposedText);
  const showBeforeAfter = hasProposed;

  return (
    <li className="list-none">
      <div
        data-finding-card
        className={`w-full rounded-lg border transition-colors ${baseClass} ${outlineClass}`}
      >
        {/* Header row */}
        <div
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
          className={`px-3 pt-2.5 pb-2 ${canSelect ? 'cursor-pointer' : 'cursor-default'}`}
          aria-pressed={canSelect ? isSelected : undefined}
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] font-semibold tracking-wide ${
                  SEVERITY_BADGE_CLASS[item.severity]
                }`}
              >
                {SEVERITY_LABEL[item.severity]}
              </span>
            </div>
            {/* Dismiss button */}
            <button
              type="button"
              onClick={handleDismiss}
              title="Dismiss"
              className="shrink-0 p-0.5 text-figma-muted/50 hover:text-figma-muted transition-colors rounded"
            >
              <DismissIcon />
            </button>
          </div>
          <p className="text-[12px] font-medium text-figma-text">{item.title}</p>
          <p className="text-[11px] text-figma-muted leading-relaxed mt-1">{item.detail}</p>
        </div>

        {/* Before / After block */}
        {showBeforeAfter && (
          <div className="mx-3 mb-2.5 rounded border border-figma-border overflow-hidden text-[11px]">
            {hasOriginal && (
              <div className="px-2.5 py-1.5 bg-figma-elevated/50 border-b border-figma-border">
                <p className="text-[9px] font-semibold text-figma-muted uppercase tracking-wider mb-0.5">
                  Current
                </p>
                <p className="text-figma-muted leading-snug">{item.original}</p>
              </div>
            )}
            <div className="px-2.5 py-1.5 bg-figma-purple/[0.06] border-l-2 border-figma-purple/60">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold text-figma-purple/80 uppercase tracking-wider mb-0.5">
                    Suggested
                  </p>
                  <p className="text-figma-text leading-snug">{item.proposedText}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy suggestion"
                  className="shrink-0 mt-0.5 text-figma-muted hover:text-figma-text transition-colors"
                >
                  {copied ? (
                    <span className="text-[9px] font-medium text-emerald-400">Copied</span>
                  ) : (
                    <CopyIcon />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Focus + Details footer */}
        {(item.layerId || item.rule) && (
          <div className="px-3 pb-2.5 flex items-center gap-3">
            {item.layerId && onFocusLayer && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFocusLayer(item.layerId!, undefined);
                }}
                className="text-[9px] font-medium text-figma-purple underline text-left"
              >
                Focus in canvas
              </button>
            )}
            {(item.layerId || item.rule) && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailsOpen((v) => !v);
                }}
                className="ml-auto flex items-center gap-1 text-[9px] text-figma-muted hover:text-figma-text transition-colors"
              >
                Details
                <ChevronIcon open={detailsOpen} />
              </button>
            )}
          </div>
        )}

        {detailsOpen && (
          <div className="mx-3 mb-2.5 px-2.5 py-2 rounded bg-figma-elevated/60 border border-figma-border text-[9px] text-figma-muted space-y-0.5 font-mono">
            {item.rule && <p>Rule: {item.rule}</p>}
            {item.layerId && <p>Layer: {item.layerId.slice(0, 20)}{item.layerId.length > 20 ? '…' : ''}</p>}
          </div>
        )}
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

export default function ReportPanel({
  items,
  selectedId,
  appliedIds,
  dismissedIds,
  hideApplied = false,
  onSelect,
  onDismiss,
  onFocusLayer,
}: ReportPanelProps) {
  const [dismissedOpen, setDismissedOpen] = useState(false);

  const activeItems = items.filter(
    (i) =>
      !dismissedIds.includes(i.id) &&
      !(hideApplied && appliedIds.includes(i.id)),
  );
  const dismissedItems = items.filter((i) => dismissedIds.includes(i.id));

  if (activeItems.length === 0 && dismissedItems.length === 0) return null;

  const useGroupedSections =
    activeItems.some((i) => i.category != null) && activeItems.length > 0;

  const renderList = (list: ReportItem[], keyPrefix = '') => (
    <ul className="flex flex-col gap-2">
      {sortFindings(list).map((item) => (
        <FindingRow
          key={`${keyPrefix}${item.id}`}
          item={item}
          selectedId={selectedId}
          appliedIds={appliedIds}
          onSelect={onSelect}
          onDismiss={onDismiss}
          onFocusLayer={onFocusLayer}
        />
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      {/* Suggestions count header */}
      {activeItems.length > 0 && (
        <p className="text-[10px] font-semibold text-figma-muted px-0.5">
          Suggestions ({activeItems.length})
        </p>
      )}

      {!useGroupedSections ? (
        renderList(activeItems)
      ) : (
        <div className="flex flex-col gap-4">
          {CATEGORY_ORDER.map((cat) => {
            const group = activeItems.filter((i) => i.category === cat);
            if (group.length === 0) return null;
            return (
              <div key={cat} className="flex flex-col gap-2">
                <p className="text-[10px] font-semibold text-figma-text px-0.5">
                  {CATEGORY_LABEL[cat]}
                </p>
                {renderList(group, `${cat}-`)}
              </div>
            );
          })}
          {/* Uncategorized items */}
          {(() => {
            const uncategorized = activeItems.filter((i) => !i.category);
            if (uncategorized.length === 0) return null;
            return (
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-semibold text-figma-text px-0.5">Other</p>
                {renderList(uncategorized, 'uncat-')}
              </div>
            );
          })()}
        </div>
      )}

      {/* Dismissed accordion */}
      {dismissedItems.length > 0 && (
        <div className="rounded-lg border border-figma-border bg-figma-surface/50 mt-1">
          <button
            type="button"
            onClick={() => setDismissedOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2 text-left"
          >
            <span className="text-[10px] font-semibold text-figma-muted">
              Dismissed ({dismissedItems.length})
            </span>
            <ChevronIcon open={dismissedOpen} />
          </button>
          {dismissedOpen && (
            <div className="px-3 pb-3">
              <ul className="flex flex-col gap-2">
                {dismissedItems.map((item) => (
                  <li key={`dismissed-${item.id}`}>
                    <button
                      type="button"
                      onClick={() => onDismiss(item.id)}
                      title="Restore"
                      className="w-full text-left px-2.5 py-1.5 rounded border border-figma-border bg-figma-elevated/40 hover:border-figma-border/80 transition-colors"
                    >
                      <p className="text-[11px] text-figma-muted line-clamp-1">{item.title}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
