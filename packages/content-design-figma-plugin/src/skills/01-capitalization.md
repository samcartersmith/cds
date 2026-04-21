# Capitalization Rules

## Default: Sentence case

All UI text — buttons, links, titles, headings, body copy — must use sentence case. Only the first word is capitalized (plus proper nouns).

- error: Title Case in a headline, button, or label (unless it's a product/asset/tab/campaign name)
- error: Start Case (every word capitalized regardless)

## Exceptions — always Title Case

These are NOT violations. Do not flag:

- Product names: Coinbase One, Coinbase Wallet, Coinbase Card, Coinbase Advanced, Coinbase Security Prompt
- Team names and titles: "Senior Manager", "Design team"
- Assets: Bitcoin, Ethereum, Solana, etc.
- Apps: Uniswap, Aave, etc.
- Protocols: Arbitrum, Optimism, etc.
- Tab names when referenced in copy: Settings, Prices, Home
- Campaign names: Beat the Expert, Member Month, The Big Game Challenge
- Tickers are always ALL CAPS: BTC, ETH, USDC, SHIB

## Feature names — always sentence case

- "USDC rewards" not "USDC Rewards"
- "Coinbase staking" not "Coinbase Staking"
- "learning rewards" not "Learning Rewards" (unless "Coinbase Learning Rewards" — the full product name)

## ALL CAPS

- Acceptable ONLY for CDS component tags and table headers. If \`layerName\` does not suggest a tag or table header, flag ALL CAPS as an error.

## Do / Don't examples

- ✅ "Buy and sell crypto" — sentence case
- ❌ "Buy And Sell Crypto" — Start Case, never used
- ❌ "Buy and Sell Crypto" — Title Case, not allowed in Retail
- ✅ "Coinbase One" — product name, correctly Title Case
- ✅ "USDC rewards" — feature name, correctly sentence case
- ❌ "USDC Rewards" — feature name incorrectly capitalized
