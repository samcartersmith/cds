import { CDS_REVIEW_PLUGIN_VERSION } from '../constants';

interface PluginHeaderProps {
  title?: string;
  showSettings: boolean;
  onSettingsClick: () => void;
  showBack?: boolean;
  onBack?: () => void;
  showHistory?: boolean;
  onHistoryClick?: () => void;
}

export default function PluginHeader({
  title = 'CDS Review',
  showSettings,
  onSettingsClick,
  showBack,
  onBack,
  showHistory,
  onHistoryClick,
}: PluginHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-figma-border shrink-0">
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          title="Back"
          className="shrink-0 -ml-1 p-1 rounded text-[#8A919E] hover:text-white hover:bg-figma-elevated transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
      <div className="w-5 h-5 rounded bg-figma-purple flex items-center justify-center shrink-0">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.5 4.5H11L8.5 6.8L9.5 10.5L6 8.3L2.5 10.5L3.5 6.8L1 4.5H4.5L6 1Z"
            fill="white"
          />
        </svg>
      </div>
      <span
        className="text-[13px] font-semibold text-figma-text tracking-tight min-w-0 truncate"
        title={title}
      >
        {title}
      </span>
      <div className="ml-auto flex items-center gap-1 shrink-0">
        <span className="text-[10px] font-medium text-figma-purple bg-figma-purple-dim px-1.5 py-0.5 rounded">
          {CDS_REVIEW_PLUGIN_VERSION}
        </span>
        {showHistory && onHistoryClick && (
          <button
            type="button"
            onClick={onHistoryClick}
            title="Recent chats"
            className="text-[#8A919E] hover:text-white transition-colors p-1 rounded"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 3v3l2.5 2.5M8 14a6 6 0 100-12 6 6 0 000 12z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {showSettings && (
          <button
            type="button"
            onClick={onSettingsClick}
            title="Settings"
            className="text-[#8A919E] hover:text-white transition-colors p-0.5 rounded"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 10a2 2 0 100-4 2 2 0 000 4zM13.7 9.4l.9-.5a1 1 0 000-1.8l-.9-.5a6 6 0 00-.5-1.2l.2-1a1 1 0 00-1.3-1.3l-1 .2A6 6 0 009.4 2.3l-.5-.9a1 1 0 00-1.8 0l-.5.9A6 6 0 005.4 3.8l-1-.2A1 1 0 003.1 4.9l.2 1A6 6 0 002.3 7l-.9.5a1 1 0 000 1.8l.9.5c.1.4.3.8.5 1.2l-.2 1a1 1 0 001.3 1.3l1-.2c.4.2.8.4 1.2.5l.5.9a1 1 0 001.8 0l.5-.9c.4-.1.8-.3 1.2-.5l1 .2a1 1 0 001.3-1.3l-.2-1c.2-.4.4-.8.5-1.2z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
