import { useState } from "react";

interface ApiKeyPromptProps {
  onSave: (key: string) => void;
  initialValue?: string;
  saveLabel?: string;
}

export default function ApiKeyPrompt({
  onSave,
  initialValue = "",
  saveLabel = "Save & continue",
}: ApiKeyPromptProps) {
  const [value, setValue] = useState(initialValue);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed.length < 8) {
      setError("Key looks too short — double-check it");
      return;
    }
    setError("");
    onSave(trimmed);
  };

  return (
    <div className="flex flex-col h-full px-5 py-6 animate-fade-in">
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className="w-12 h-12 rounded-2xl bg-figma-purple-dim border border-figma-purple/20 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              stroke="#578BFA"
              strokeWidth="1.5"
            />
            <path
              d="M7 11V7a5 5 0 0 1 10 0v4"
              stroke="#578BFA"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.5" fill="#578BFA" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-[14px] font-semibold text-figma-text text-center mb-1">
        Connect to LLM Gateway
      </h2>
      <p className="text-[11px] text-figma-muted text-center leading-relaxed mb-3">
        Enter your Coinbase LLM Gateway key. It's saved locally in Figma via{" "}
        <code className="text-figma-purple text-[10px]">clientStorage</code> and
        never shared outside this plugin.
      </p>
      <p className="text-[11px] text-figma-muted text-center leading-relaxed mb-6">
        You can create or copy your key from{" "}
        <a
          href="https://cbgpt.zero.coinbase-corp.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-figma-purple hover:underline font-medium"
        >
          CBGPT API keys
        </a>
        .
      </p>

      {/* Gateway info pill */}
      <div className="flex items-center gap-2 px-3 py-2 bg-figma-surface border border-figma-border rounded-lg mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-figma-green shrink-0" />
        <div className="min-w-0">
          <p className="text-[9px] text-figma-muted uppercase tracking-wider font-medium mb-0.5">
            Gateway
          </p>
          <p className="text-[10px] text-figma-text font-mono truncate">
            llm-gateway.cbhq.net/v1 · claude-sonnet-4
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-1.5 mb-3">
        <label className="text-[11px] font-medium text-figma-muted">
          API Key
        </label>
        <div
          className={`flex items-center bg-figma-surface border rounded-lg px-3 py-2.5 gap-2 transition-colors ${
            error
              ? "border-red-500/60"
              : "border-figma-border focus-within:border-figma-purple/60"
          }`}
        >
          <input
            type={showKey ? "text" : "password"}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Paste your gateway key…"
            className="flex-1 bg-transparent text-[12px] text-figma-text placeholder:text-figma-muted font-mono"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="text-figma-muted hover:text-figma-text transition-colors"
            title={showKey ? "Hide" : "Show"}
          >
            {showKey ? (
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>
        {error && <p className="text-[10px] text-red-400">{error}</p>}
      </div>

      {/* Save button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={!value.trim()}
        className={`w-full py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-150 ${
          value.trim()
            ? "bg-figma-purple hover:bg-figma-purple-hover text-white"
            : "bg-figma-surface border border-figma-border text-figma-muted cursor-not-allowed"
        }`}
      >
        {saveLabel}
      </button>

      {/* Footer note */}
      <div className="mt-auto pt-6 text-center">
        <p className="text-[10px] text-figma-muted leading-relaxed">
          Key is stored via{" "}
          <code className="text-figma-purple text-[10px]">figma.clientStorage</code>
          {" "}— scoped to this plugin, this Figma account.
        </p>
      </div>
    </div>
  );
}
