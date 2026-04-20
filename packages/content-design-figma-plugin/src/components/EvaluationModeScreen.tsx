import type { EvaluationMode } from "../types";
import { AGENTS } from "../agents/registry";

interface EvaluationModeScreenProps {
  onSelect: (mode: EvaluationMode) => void;
}

export default function EvaluationModeScreen({ onSelect }: EvaluationModeScreenProps) {
  return (
    <div className="flex flex-col flex-1 px-4 py-4 gap-3 min-h-0 overflow-y-auto">
      <div className="mb-1">
        <p className="text-[13px] font-semibold text-figma-text">Choose evaluation scope</p>
        <p className="text-[11px] text-figma-muted leading-relaxed mt-1">
          Full review covers CDS, content, and accessibility. Or focus on one area.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => onSelect(agent.evaluationMode)}
            className="text-left px-3 py-2.5 rounded-lg border border-figma-border bg-figma-surface hover:bg-figma-elevated hover:border-figma-purple/40 transition-colors"
          >
            <span className="block text-[12px] font-medium text-figma-text">{agent.label}</span>
            <span className="block text-[10px] text-figma-muted mt-0.5 leading-snug">
              {agent.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
