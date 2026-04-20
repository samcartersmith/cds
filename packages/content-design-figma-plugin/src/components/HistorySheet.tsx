import type { SavedChatSession } from "../types";
import { getAgentForEvaluationMode } from "../agents/registry";

function formatTime(savedAt: number): string {
  try {
    const d = new Date(savedAt);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

interface HistorySheetProps {
  open: boolean;
  entries: SavedChatSession[];
  onClose: () => void;
  onSelect: (entry: SavedChatSession) => void;
}

const MODE_BADGE_CLASS: Record<SavedChatSession["evaluationMode"], string> = {
  full: "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30",
  cds: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
  content: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  a11y: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
};

function groupByFileName(entries: SavedChatSession[]): Array<{ fileName: string; items: SavedChatSession[] }> {
  const groups = new Map<string, SavedChatSession[]>();
  for (const entry of entries) {
    const key = entry.fileName?.trim() || "Unknown file";
    const list = groups.get(key) ?? [];
    list.push(entry);
    groups.set(key, list);
  }
  return Array.from(groups.entries()).map(([fileName, items]) => ({ fileName, items }));
}

export default function HistorySheet({ open, entries, onClose, onSelect }: HistorySheetProps) {
  if (!open) return null;
  const groupedEntries = groupByFileName(entries);

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col bg-figma-bg/95 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Recent chats"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-figma-border shrink-0">
        <div>
          <p className="text-[13px] font-semibold text-figma-text">Recent chats</p>
          <p className="text-[10px] text-figma-muted mt-0.5">Last 5 sessions on this device</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-figma-muted hover:text-figma-text p-1 rounded transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 3.5l7 7M10.5 3.5l-7 7"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 min-h-0">
        {entries.length === 0 ? (
          <p className="text-[11px] text-figma-muted text-center py-8 px-4 leading-relaxed">
            No saved chats yet. Run a review and your session will appear here (up to five).
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {groupedEntries.map((group) => (
              <section key={group.fileName} className="flex flex-col gap-1.5">
                <p
                  className="text-[9px] uppercase tracking-wider font-semibold text-figma-muted px-1"
                  title={group.fileName}
                >
                  {group.fileName}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.items.map((entry) => {
                    const agent = getAgentForEvaluationMode(entry.evaluationMode);
                    return (
                      <li key={entry.id}>
                        <button
                          type="button"
                          onClick={() => onSelect(entry)}
                          className="w-full text-left px-3 py-2.5 rounded-lg border border-figma-border bg-figma-surface hover:bg-figma-elevated hover:border-figma-purple/35 transition-colors"
                        >
                          <p className="text-[12px] font-medium text-figma-text line-clamp-2">
                            {entry.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            <span
                              className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${MODE_BADGE_CLASS[entry.evaluationMode]}`}
                            >
                              {agent.label}
                            </span>
                            <span className="text-[9px] text-figma-muted">{entry.selectionLabel}</span>
                            <span className="text-[9px] text-figma-muted ml-auto">{formatTime(entry.savedAt)}</span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
