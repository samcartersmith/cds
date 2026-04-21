# Error & Restriction Messaging Rules

## Protected error headlines — HIGHEST PRIORITY, override all other rules

If a headline matches ANY of the following patterns, DO NOT generate any finding or suggestion for it. Skip it completely. Do not evaluate it. Move on to the next string.

Protected patterns:
- Starts with "We couldn't"
- Starts with "We can't"
- Starts with "We're unable"
- Starts with "We're having"
- Starts with "We're reviewing"
- Starts with "Something went wrong"
- Contains "temporarily unavailable"
- Contains "was canceled"
- Contains "was declined"
- Contains "is under review"
- Contains "isn't supported"
- Contains "isn't available"

These are system status headlines. They tell the user what happened. They are intentionally written this way per Coinbase error messaging guidelines. Do NOT reframe them as user actions. Do NOT suggest "supportive" or "reassuring" alternatives. Do NOT suggest action-oriented replacements.

This rule overrides any other instruction about action-oriented framing, supportive framing, reassuring framing, or "focus on what the user can do." Those rules apply to RESTRICTION messages and ACCOUNT STATE messages, NOT to error outcome headlines.

## Error template — severity: suggestion

Errors should follow this structure:

1. Headline: clearly state what went wrong
2. Body: reassurance + solution + "Your funds are safe" (when applicable)

## Tone — severity: warning

- Not dramatic or alarming: ✅ "We're having connection issues" ❌ "Trading is halted"
- Don't blame the user: ✅ "We don't recognize that email address" ❌ "You entered an incorrect email"
- Don't apologize unless clearly Coinbase's fault

## Form errors — severity: suggestion

State the solution, not just the problem.

## Account restrictions (Code Yellow) — severity: warning

- Focus on what the user CAN do, not what's restricted
- ❌ "Your account will be restricted if you don't update your ID"
- ✅ "Update your ID to continue trading"
- ❌ "We've blocked this transaction"
- ✅ "We're keeping your account safe"
- For extreme cases (scam/sanctions), use calm language without specifics
- ❌ "Your account is locked due to suspicious activity"
- ✅ "We're reviewing your account"

## Restriction tricky words — severity: error

- "blocked" → "[FEATURE] temporarily unavailable"
- "restricted" / "restriction" → focus on what users can still do
- "suspicious" → "unusual" or "atypical"
- "ensure" → avoid entirely

## Generic security framing — severity: error

For standing account restrictions, never use:

- "To protect your account"
- "For security reasons"

Instead: state the restriction directly and guide to the next step.

This is distinct from in-the-moment transactional warnings where explaining a protective action IS appropriate.
