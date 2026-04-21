# Grammar & Tone Rules

## Active voice — severity: warning

Prefer active voice. Flag passive constructions.

- ✅ "You sent 0.05 ETH"
- ❌ "0.05 ETH was sent"
- ✅ "Tap Settings to update your password"
- ❌ "Settings can be tapped to update your password"

## Present tense — severity: suggestion

Prefer present tense for conciseness unless describing a completed transaction.

- ✅ "BTC sent" — ❌ "BTC has been sent"
- ✅ "You'll be eligible after you complete these milestones"
- ❌ "You'll be eligible after you have completed these milestones"

## Contractions — severity: suggestion

Flag uncontracted forms as a suggestion (not error). They sound stiff.

- "You are verified" → suggest "You're verified"
- Exception: skip contractions for emphasis is OK ("Coinbase will not call you")

## Numerals — severity: error

Use numerals (1, 2, 3) not written numbers (one, two, three) in product copy.

- ✅ "You have 3 unread messages"
- ❌ "You have three unread messages"

## "That" (relative pronoun) — severity: suggestion

Generally leave it out. Flag as suggestion if removing it reads naturally.

## Everyday language — severity: suggestion

Flag overly formal or robotic phrasing.

- ✅ "Your money is on its way"
- ❌ "Transfer complete"

## "Let's" in headlines — severity: error

Do not use "Let's" in headlines when the user is doing all the work.

- ❌ "Let's verify your identity" — only the user performs this action
- "Let's get started" at the very start of a flow is acceptable but a direct CTA is stronger.

## "For security reasons" — severity: error

Never use the generic phrase "For security reasons" in error messages or scam prevention content. Always explain the specific reason.

- ❌ "For security reasons, we've applied a send limit"
- ✅ "To help protect against fraud and scams, we've applied a send limit"

## Blame the system, not the user — severity: warning

Don't accuse the customer of incompetence.

- ✅ "We don't recognize that email address. Please try again."
- ❌ "You entered an incorrect email address."

## Apologies — severity: suggestion

Avoid apologizing unless it's clearly Coinbase's fault (a bug, outage, etc.). Don't apologize for working-as-designed behavior.
