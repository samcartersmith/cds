interface ThinkingIndicatorProps {
  agentUiMode: 'suggestions' | 'report' | 'chat';
  analyzingScreens: boolean;
}

export default function ThinkingIndicator({
  agentUiMode,
  analyzingScreens,
}: ThinkingIndicatorProps) {
  const label =
    agentUiMode === 'suggestions'
      ? 'Generating suggestions...'
      : analyzingScreens
      ? 'Analyzing screens...'
      : 'Thinking...';

  return (
    <div className="flex items-center gap-2 px-3 py-2.5 bg-figma-surface rounded-lg animate-fade-in w-fit">
      <div className="flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-figma-purple animate-pulse-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <span className="text-[11px] text-figma-muted">{label}</span>
    </div>
  );
}
