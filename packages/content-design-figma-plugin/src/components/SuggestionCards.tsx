import { useState, useCallback } from 'react';
import type { Suggestion } from '../types';

interface SuggestionCardsProps {
  suggestions: Suggestion[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDismiss: (id: string) => void;
  dismissedIds: string[];
  /** The current text on the active layer, used for the "Current" row */
  currentText?: string;
}

function CopyIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
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

function SuggestionCard({
  suggestion,
  isSelected,
  onSelect,
  onDismiss,
  currentText,
  animationDelay,
}: {
  suggestion: Suggestion;
  isSelected: boolean;
  onSelect: () => void;
  onDismiss: () => void;
  currentText?: string;
  animationDelay: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(suggestion.text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    },
    [suggestion.text],
  );

  return (
    <div
      className={`w-full rounded-lg border transition-all duration-150 animate-slide-up ${
        isSelected
          ? 'border-figma-purple bg-figma-purple-dim shadow-[0_0_0_1px_#578BFA40]'
          : 'border-figma-border bg-figma-surface hover:border-figma-purple/40 hover:bg-figma-elevated'
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Card header — clickable to select */}
      <button
        type="button"
        onClick={onSelect}
        className="w-full text-left px-3 pt-2.5 pb-0"
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <div
            className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
              isSelected
                ? 'bg-figma-purple border-figma-purple'
                : 'border-figma-border'
            }`}
          >
            {isSelected && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path
                  d="M1 3.5L3.5 6L8 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0 pb-2.5">
            <p className="text-[10px] text-figma-muted mb-0.5">
              {suggestion.text.split(' ').length}w
              {suggestion.label ? ` · ${suggestion.label}` : ''}
            </p>
          </div>
          {/* Dismiss */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            title="Dismiss"
            className="shrink-0 p-0.5 text-figma-muted/50 hover:text-figma-muted transition-colors rounded mt-0.5"
          >
            <DismissIcon />
          </button>
        </div>
      </button>

      {/* Before / After block */}
      <div className="mx-3 mb-2.5 rounded border border-figma-border overflow-hidden text-[11px]">
        {currentText && (
          <div className="px-2.5 py-1.5 bg-figma-elevated/50 border-b border-figma-border">
            <p className="text-[9px] font-semibold text-figma-muted uppercase tracking-wider mb-0.5">
              Current
            </p>
            <p className="text-figma-muted leading-snug">{currentText}</p>
          </div>
        )}
        <div className="px-2.5 py-1.5 bg-figma-purple/[0.06] border-l-2 border-figma-purple/60">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-semibold text-figma-purple/80 uppercase tracking-wider mb-0.5">
                Suggested
              </p>
              <p className="text-figma-text leading-snug">{suggestion.text}</p>
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
    </div>
  );
}

export default function SuggestionCards({
  suggestions,
  selectedId,
  onSelect,
  onDismiss,
  dismissedIds,
  currentText,
}: SuggestionCardsProps) {
  const [dismissedOpen, setDismissedOpen] = useState(false);

  const activeCards = suggestions.filter((s) => !dismissedIds.includes(s.id));
  const dismissedCards = suggestions.filter((s) => dismissedIds.includes(s.id));

  if (activeCards.length === 0 && dismissedCards.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 animate-slide-up">
      {activeCards.length > 0 && (
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-semibold text-figma-muted">
            Suggestions ({activeCards.length})
          </span>
          <div className="flex-1 h-px bg-figma-border" />
        </div>
      )}

      {activeCards.map((s, i) => (
        <SuggestionCard
          key={s.id}
          suggestion={s}
          isSelected={selectedId === s.id}
          onSelect={() => onSelect(s.id)}
          onDismiss={() => onDismiss(s.id)}
          currentText={currentText}
          animationDelay={i * 60}
        />
      ))}

      {/* Dismissed accordion */}
      {dismissedCards.length > 0 && (
        <div className="rounded-lg border border-figma-border bg-figma-surface/50 mt-1">
          <button
            type="button"
            onClick={() => setDismissedOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2 text-left"
          >
            <span className="text-[10px] font-semibold text-figma-muted">
              Dismissed ({dismissedCards.length})
            </span>
            <ChevronIcon open={dismissedOpen} />
          </button>
          {dismissedOpen && (
            <div className="px-3 pb-3">
              <ul className="flex flex-col gap-2">
                {dismissedCards.map((s) => (
                  <li key={`dismissed-${s.id}`}>
                    <button
                      type="button"
                      onClick={() => onDismiss(s.id)}
                      title="Restore"
                      className="w-full text-left px-2.5 py-1.5 rounded border border-figma-border bg-figma-elevated/40 hover:border-figma-border/80 transition-colors"
                    >
                      <p className="text-[11px] text-figma-muted line-clamp-1">{s.text}</p>
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
