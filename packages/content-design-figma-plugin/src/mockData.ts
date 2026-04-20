import type { ReportItem, Suggestion } from "./types";

const banks: Record<string, Suggestion[]> = {
  shorter: [
    {
      id: "s1",
      text: "Verify your email to start your trial.",
      label: "Shorter",
      tone: "Direct",
    },
    {
      id: "s2",
      text: "Check your inbox to activate your free trial.",
      label: "Shorter",
      tone: "Action-first",
    },
    {
      id: "s3",
      text: "Confirm your email. Start for free.",
      label: "Shorter",
      tone: "Punchy",
    },
  ],
  friendly: [
    {
      id: "f1",
      text: "Verify your email to start your trial.",
      label: "Friendly",
      tone: "Warm",
    },
    {
      id: "f2",
      text: "We just need to confirm your email before your free trial kicks off.",
      label: "Friendly",
      tone: "Conversational",
    },
    {
      id: "f3",
      text: "Almost there — confirm your email to unlock your free trial.",
      label: "Friendly",
      tone: "Encouraging",
    },
  ],
  formal: [
    {
      id: "fr1",
      text: "Please verify your email address to activate your free trial.",
      label: "Formal",
      tone: "Professional",
    },
    {
      id: "fr2",
      text: "Email confirmation is required to initiate your trial period.",
      label: "Formal",
      tone: "Legal",
    },
    {
      id: "fr3",
      text: "To begin your free trial, please confirm your email address.",
      label: "Formal",
      tone: "Business",
    },
  ],
  default: [
    {
      id: "d1",
      text: "Confirm your email to activate your free trial.",
      label: "Refined",
      tone: "Clear",
    },
    {
      id: "d2",
      text: "Verify your email to unlock your free trial today.",
      label: "Refined",
      tone: "Action-oriented",
    },
    {
      id: "d3",
      text: "Almost done — just confirm your email to get started.",
      label: "Refined",
      tone: "Reassuring",
    },
  ],
};

export function getMockSuggestions(prompt: string): Suggestion[] {
  const lower = prompt.toLowerCase();
  if (lower.includes("short") || lower.includes("brief") || lower.includes("concise")) {
    return banks.shorter;
  }
  if (
    lower.includes("friend") ||
    lower.includes("warm") ||
    lower.includes("casual") ||
    lower.includes("human")
  ) {
    return banks.friendly;
  }
  if (lower.includes("formal") || lower.includes("professional") || lower.includes("business")) {
    return banks.formal;
  }
  return banks.default;
}

export function getMockReportItems(): ReportItem[] {
  const layerId = "mock-node-1";
  return [
    {
      id: "m-cds",
      category: "cds",
      severity: "medium",
      priority: 6,
      title: "Terminology",
      detail: 'Prefer "asset" over "token" in customer-facing UI per CDS copy patterns.',
      layerId,
      proposedText: "Buy assets with your balance",
    },
    {
      id: "m-a11y",
      category: "a11y",
      severity: "high",
      priority: 9,
      title: "Avoid vague link text",
      detail:
        'Replace "Learn more" with specific action text so screen reader users know where the link goes.',
      layerId,
      proposedText: "See pricing and fees",
    },
    {
      id: "m-content",
      category: "content",
      severity: "low",
      priority: 4,
      title: "Sentence case",
      detail: "Use sentence case for UI strings unless referring to a proper product name.",
      layerId,
      proposedText: "Confirm your email to start your free trial",
    },
  ];
}
