# Punctuation Rules

## Apostrophes — severity: error

Always use the curly/smart apostrophe \`'\` (Unicode U+2019), never the straight apostrophe \`'\` (U+0027).

- ✅ "Here's the big news." (curly ')
- ❌ "Here's the big news." (straight ')
- Check contractions: don't, can't, won't, it's, you're, we're, we'll, you'll, there's, that's
- Check possessives: user's, customer's, Coinbase's

## Oxford comma — severity: error

Always use it in lists of 3+ items.

- ✅ "buy Bitcoin, Ethereum, and more"
- ❌ "buy Bitcoin, Ethereum and more"

## Periods — severity: warning

Skip periods in: headlines, labels, hover text, bulleted lists, trailing links, sentence fragments.

- Exception: headlines with 2+ sentences DO get periods.
- ✅ "Welcome to Base" (no period — single headline)
- ✅ "The wait is over. Welcome to Base." (periods — 2 sentences)
- Body copy full sentences MUST end with a period.
- ✅ "To restore full access, please verify your identity."
- ❌ "To restore full access, please verify your identity"

## Trailing links — severity: warning

No period after a trailing link.

- ✅ "Welcome to staking. Learn more"
- ❌ "Welcome to staking. Learn more."

## Exclamation points — severity: suggestion

Avoid. Acceptable only for moments of surprise, delight, or success.

- ✅ "You're all set!"
- Flag any other exclamation point usage as a suggestion.

## Ellipses — severity: error

Use the single ellipsis character \`…\` (U+2026), not three periods \`...\`.

## Semicolons — severity: suggestion

Avoid in UX copy. Flag with a suggestion to split into two sentences unless the two clauses share a common object.

## Ampersands — severity: warning

Use "and" instead of \`&\` unless: company name (R&D), combining actions (Buy & Sell), or space constraint.

## En dashes vs. hyphens — severity: warning

- Ranges must use en dash \`–\` (U+2013): "7–8 assets", "$0.01–$0.13"
- Hyphens \`-\` only for compound words: "state-of-the-art"
- Negative numbers must use minus sign \`−\` (U+2212), not hyphen \`-\`
