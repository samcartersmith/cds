interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/30 rounded-lg animate-fade-in">
      <svg
        className="shrink-0 mt-0.5"
        width="12"
        height="12"
        viewBox="0 0 14 14"
        fill="none"
      >
        <circle cx="7" cy="7" r="6" stroke="#f87171" strokeWidth="1.2" />
        <path d="M7 4v3M7 9.5v.5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="flex-1 text-[11px] text-red-400 leading-relaxed">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="text-red-400/60 hover:text-red-400 transition-colors shrink-0"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M1.5 1.5l7 7M8.5 1.5l-7 7"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
