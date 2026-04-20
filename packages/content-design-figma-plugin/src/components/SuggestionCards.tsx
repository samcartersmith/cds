import type { Suggestion } from "../types";

interface SuggestionCardsProps {
  suggestions: Suggestion[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const toneColors: Record<string, string> = {
  Direct: "text-blue-400 bg-blue-400/10",
  "Action-first": "text-orange-400 bg-orange-400/10",
  Punchy: "text-pink-400 bg-pink-400/10",
  Warm: "text-yellow-400 bg-yellow-400/10",
  Conversational: "text-green-400 bg-green-400/10",
  Encouraging: "text-teal-400 bg-teal-400/10",
  Professional: "text-slate-400 bg-slate-400/10",
  Legal: "text-red-400 bg-red-400/10",
  Business: "text-indigo-400 bg-indigo-400/10",
  Clear: "text-figma-purple bg-figma-purple-dim",
  "Action-oriented": "text-orange-400 bg-orange-400/10",
  Reassuring: "text-teal-400 bg-teal-400/10",
};

export default function SuggestionCards({
  suggestions,
  selectedId,
  onSelect,
}: SuggestionCardsProps) {
  return (
    <div className="flex flex-col gap-2 animate-slide-up">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[10px] font-medium text-figma-muted uppercase tracking-wider">
          Suggestions
        </span>
        <div className="flex-1 h-px bg-figma-border" />
        <span className="text-[10px] text-figma-muted">{suggestions.length} options</span>
      </div>

      {suggestions.map((s, i) => {
        const isSelected = selectedId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full text-left rounded-lg border transition-all duration-150 group animate-slide-up ${
              isSelected
                ? "border-figma-purple bg-figma-purple-dim shadow-[0_0_0_1px_#578BFA40]"
                : "border-figma-border bg-figma-surface hover:border-figma-purple/40 hover:bg-figma-elevated"
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start gap-3 p-3">
              {/* Checkbox */}
              <div
                className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                  isSelected
                    ? "bg-figma-purple border-figma-purple"
                    : "border-figma-border group-hover:border-figma-purple/50"
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

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[12px] leading-relaxed mb-1.5 ${
                    isSelected ? "text-figma-text" : "text-figma-text"
                  }`}
                >
                  {s.text}
                </p>
                <div className="flex items-center gap-1.5">
                  {s.label && (
                    <span className="text-[10px] font-medium text-figma-muted bg-figma-elevated border border-figma-border px-1.5 py-0.5 rounded">
                      {s.label}
                    </span>
                  )}
                  {s.tone && (
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        toneColors[s.tone] ?? "text-figma-muted bg-figma-elevated"
                      }`}
                    >
                      {s.tone}
                    </span>
                  )}
                  <span className="text-[10px] text-figma-muted ml-auto">
                    {s.text.split(" ").length}w
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
