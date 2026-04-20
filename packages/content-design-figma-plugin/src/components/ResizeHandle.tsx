import type { MouseEvent } from 'react';

interface ResizeHandleProps {
  onMouseDown: (e: MouseEvent) => void;
}

export default function ResizeHandle({ onMouseDown }: ResizeHandleProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 flex items-end justify-end pb-0.5 pr-0.5 opacity-30 hover:opacity-70 transition-opacity"
      title="Drag to resize"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
        className="text-figma-muted"
      >
        <circle cx="8" cy="8" r="1.2" />
        <circle cx="5" cy="8" r="1.2" />
        <circle cx="8" cy="5" r="1.2" />
      </svg>
    </div>
  );
}
