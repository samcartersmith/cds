# Component & Pattern Rules

## Confirmation modals — severity: warning

Flag generic confirmation titles. Modal titles should mirror the specific action.

- Pattern: [Action Verb] + [Object]?
- ❌ "Are you sure?" — generic, creates anxiety
- ✅ "Remove this bank account?"

## Exit flow modals — severity: suggestion

If the user is exiting a flow, frame as help, not a gate.

- ❌ "Are you sure you want to leave?"
- ✅ "Having trouble with 2FA?"

## Enable/Disable vs. Turn on/off — severity: warning

- User-controlled: "Turn on notifications" not "Enable notifications"
- System-controlled: "Trading is enabled in your region" not "Trading is turned on in your region"

## See all vs. Show more — severity: warning

- Navigates to new page: "See all" (not "View more", "Show all", "See more")
- Expands inline: "Show more" / "Show less" (not "Read more", "Expand")

## Links — severity: warning

- Never use "Click here" or "here" as link text.
- ✅ "Read more about how to buy crypto"
- ❌ "Click here to read more"

## Transaction status — severity: warning

Avoid ambiguous system jargon.

- ❌ "Pending" → ✅ "Sending" (crypto) or "Processing" (cash)
- ❌ "Stuck" → ✅ "Action required"

## Transaction format — severity: suggestion

Structure: Action > Amount > Counterparty

- ✅ "Sent 0.05 ETH to vitalik.eth"
- ❌ "Sent to vitalik.eth 0.05 ETH"

## Transaction tense — severity: warning

Activity feed entries use simple past tense.

- ✅ "You sent 0.1 BTC" ❌ "You send 0.1 BTC" / "BTC has been sent"

## Transaction verbs — severity: suggestion

- Crypto: Sent, Received, Swapped (DEX/Wallet), Converted (Retail), Minted, Bought, Sold
- Cash: Deposited, Withdrew/Cashed out, Bought, Sold

## Push notifications — severity: suggestion

- Headline: ≤29 chars, no period
- Body: 1 emoji max, at front; ≤80 chars expanded
- ❌ Multiple emoji in body: "Your Coinbase 💳 is on the way. Keep your 👀 open"
- ✅ Single emoji at front: "💳 Your Coinbase Card is on the way"

## SMS — severity: warning

Must start with "Coinbase:". Most important info first.

- ✅ "Coinbase: 9542349 is your code. Do NOT share this code with anyone."
