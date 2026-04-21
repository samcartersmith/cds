# Number & Date Formatting Rules

## Crypto amounts — severity: error

- Max 8 decimal places. Do not round; cut off. (6 in tight spaces.)
- Amount BEFORE ticker: ✅ "10 USDC" ❌ "USDC 10"
- No modifiers between amount and ticker: ✅ "5 MATIC for free" ❌ "5 free MATIC"
- Tickers always ALL CAPS: ✅ "BTC" ❌ "btc"
- Remove trailing zeros: ✅ "5 ETH" ❌ "5.000000 ETH"
- No dollar sign with USDC: ✅ "1,000 USDC" or "$1,000" ❌ "USDC $100"
- Crypto never plural: ✅ "Bitcoin" ❌ "Bitcoins"

## Commas in numbers — severity: warning

Use commas for numerals > 1,000. Exception: no comma in percentages.

- ✅ "$1,015.95" / "10,764 assets"
- ✅ "6000%" (no comma)

## Negative numbers — severity: error

Use minus sign \`−\` (U+2212), not hyphen \`-\`.

## Large numbers — severity: warning

Use uppercase abbreviations: 230K, 45M, 15B, 1T.

## Crypto networks — severity: error

- Use "on" as preposition: ✅ "on Base" ❌ "from Base" / "via Base"
- Don't capitalize "network": ✅ "on the Base network" ❌ "on Base Network"
- Include "the" if "network" is present: ✅ "on the Base network" ❌ "on Base network"

## Crypto addresses — severity: warning

Abbreviate as \`0xA38f…1c30\` (use ellipsis character, not 3 periods).

## Dates — severity: warning

- No leading zeros: ✅ "8/24/2024" ❌ "08/24/2024"
- No ordinals: ✅ "January 24, 2024" ❌ "January 24th, 2024"
- Date placeholders lowercase: ✅ "mm/dd/yyyy" ❌ "MM/DD/YYYY"
- Decades no apostrophe: ✅ "2020s" ❌ "2020's"
- Fiscal year no space: ✅ "FY22" ❌ "FY 22"

## Times — severity: warning

- AM/PM: all caps, space, no periods: ✅ "1:37 PM" ❌ "1:37 pm" / "1:37pm" / "1:37 P.M."
- Top of hour: hide minutes: ✅ "9 AM" ❌ "9:00 AM"
- Time zones: ✅ "ET" ❌ "EDT" (avoid the D for daylight)

## Ranges — severity: error

Use en dash \`–\`, not hyphen \`-\`: ✅ "3–5 minutes" ❌ "3-5 minutes"

## Countdowns — severity: warning

Use "{time} left". Avoid "expires in".

- ✅ "23d left" ❌ "Expires in 23d"

## Tax forms — severity: error

Use official IRS names. Plural is "Forms X".

- ✅ "Form 1099-K" ❌ "1099K"
- ✅ "Forms W-2" ❌ "Form W-2s"
