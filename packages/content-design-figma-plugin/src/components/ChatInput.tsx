import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { EvaluationMode } from '../types';

const QUICK_PROMPTS_BY_MODE: Record<EvaluationMode, string[]> = {
  content: ['Make it shorter', 'More friendly tone', 'More formal', 'Add urgency'],
  cds: [
    'Check labels and terminology against CDS',
    'Find inconsistent wording patterns',
    'List top CDS compliance fixes',
    'Suggest replacement copy for CDS issues',
  ],
  a11y: [
    'Find ambiguous link or button text',
    'Check for directional language issues',
    'Highlight clarity issues for screen readers',
    'Give highest-impact accessibility copy fixes',
  ],
  full: [
    'Run a full review and rank top issues',
    'Give me blocker and high-priority fixes first',
    'Summarize top copy risks and improvements',
    'Re-evaluate everything with strict standards',
  ],
};

interface ChatInputProps {
  onSend: (prompt: string) => void;
  disabled: boolean;
  /** When set, renders mode-specific quick prompt chips */
  evaluationMode?: EvaluationMode | null;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  disabled,
  evaluationMode = null,
  placeholder = 'Describe what you want…',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 96) + 'px';
  };

  const quickPrompts = evaluationMode ? QUICK_PROMPTS_BY_MODE[evaluationMode] : [];
  const showQuickPrompts = quickPrompts.length > 0;

  return (
    <div className="shrink-0 border-t border-figma-border bg-figma-bg">
      {showQuickPrompts && (
        <div className="px-3 pt-2.5 pb-1">
          <div className="flex gap-1.5 overflow-x-auto pb-2 pr-0.5 no-scrollbar">
            {quickPrompts.map((p) => (
              <button
                key={p}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setValue(p);
                  textareaRef.current?.focus();
                }}
                className="shrink-0 text-[10px] text-figma-muted border border-figma-border rounded-full px-2.5 py-1 hover:border-figma-purple/50 hover:text-figma-purple transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`flex items-end gap-2 px-3 pb-3 ${showQuickPrompts ? 'pt-1' : 'pt-2.5'}`}>
        <div
          className={`flex-1 flex items-end bg-figma-surface border rounded-xl px-3 py-2.5 transition-colors ${
            disabled
              ? 'border-figma-border opacity-60'
              : 'border-figma-border focus-within:border-figma-purple/60'
          }`}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            disabled={disabled}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[12px] text-figma-text placeholder:text-figma-muted resize-none leading-relaxed"
            style={{ maxHeight: 96, minHeight: 20 }}
          />
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 ${
            value.trim() && !disabled
              ? 'bg-figma-purple hover:bg-figma-purple-hover shadow-[0_0_12px_#578BFA40] text-white'
              : 'bg-figma-surface border border-figma-border opacity-50 cursor-not-allowed text-[#8A919E]'
          }`}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path
              d="M13 1L6.5 7.5M13 1L9 13L6.5 7.5M13 1L1 5L6.5 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
