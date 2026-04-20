import { Fragment, type ReactNode } from "react";
import type { ChatMessage, ReportSegment } from "../types";

function formatChatTime(sentAt?: number): string {
  if (sentAt == null) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(sentAt);
  } catch {
    return "";
  }
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const time = formatChatTime(msg.sentAt);
  return (
    <div
      className={`flex animate-fade-in ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex flex-col gap-0.5 max-w-[85%] ${
          msg.role === "user" ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-3 py-2 rounded-lg text-[12px] leading-relaxed ${
            msg.role === "user"
              ? "bg-figma-purple text-white rounded-br-sm"
              : "bg-figma-surface text-figma-text rounded-bl-sm border border-figma-border"
          }`}
        >
          {msg.text}
        </div>
        {time ? (
          <span className="text-[9px] text-figma-muted px-1 tabular-nums">{time}</span>
        ) : null}
      </div>
    </div>
  );
}

interface ChatTimelineProps {
  messages: ChatMessage[];
  reportSegments: ReportSegment[];
  renderReportSegment: (segment: ReportSegment) => ReactNode;
}

export default function ChatTimeline({
  messages,
  reportSegments,
  renderReportSegment,
}: ChatTimelineProps) {
  if (messages.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, i) => (
        <Fragment key={`${i}-${msg.sentAt ?? i}`}>
          <MessageBubble msg={msg} />
          {reportSegments
            .filter((s) => s.anchorMessageIndex === i)
            .map((s) => (
              <div key={s.id} className="animate-fade-in">
                {renderReportSegment(s)}
              </div>
            ))}
        </Fragment>
      ))}
    </div>
  );
}
