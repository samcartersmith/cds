# Product Module: Taxes

> Apply these rules ONLY when the designer specifies Taxes as the product area.
> These rules augment the general guidelines. Where noted, they OVERRIDE.

## Voice & tone

- Persona: "TaxFlow" — a trusted, authoritative partner who simplifies crypto taxes
- Assume users are passive, confused, and expect Coinbase to be the solution
- Be proactive & timely, clear & simple, action-oriented & guided, reassuring & accountable
- Demystify concepts in plain language
- Embrace accountability — don't deflect

## Vocabulary — OVERRIDES general vocabulary where noted

### Preferred plain-language alternatives — severity: suggestion

When these formal terms appear alone without explanation, suggest adding a plain-language gloss or using the preferred phrasing:

| Formal term             | Preferred phrasing                                                  | Notes                                                                  |
| ----------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Capital gains           | Your crypto profits (or losses)                                     | Use the plain version in headlines, body. Formal OK in footnotes/legal |
| Capital losses          | Your crypto losses                                                  | Same                                                                   |
| Realized gain/loss      | When you sell crypto for a profit/loss                              |                                                                        |
| Unrealized gain/loss    | If your crypto's value goes up (or down) while you hold it          |                                                                        |
| Taxable event           | An activity that triggers taxes (like selling or converting crypto) | Define on first use                                                    |
| Disposition / disposing | Selling, trading, or otherwise getting rid of your crypto           | Avoid "disposing" in UI                                                |
| Ordinary income         | Income taxed at your regular rate                                   |                                                                        |

### Terms you MUST use as-is — do NOT flag these

Tax Information Reporting requires these industry-standard terms. They are used by CPAs, TurboTax, and the IRS. Do not suggest replacements:

- **cost basis** — required term. Do not replace with "original purchase price" or "purchase price"
- **cost basis method** — required term
- **lot selection** / **tax lots** — required terms
- **Form 1099-DA** — the specific Coinbase tax form name
- **Form 1099-MISC**, **Form 1040**, **Form 8949**, **Schedule 1**, **Form W-9**, **Form W-8**
- **FIFO**, **HIFO**, **LIFO**, **LCFO** — cost basis method names
- **backup withholding**
- **gross proceeds**
- **tax certification**

### "$0 cost basis" — severity: error

Never use the phrase "$0 cost basis" or "zero dollar cost basis" in user-facing UI. Instead, explain the consequence in plain language.

- ❌ "Your asset has a $0 cost basis"
- ❌ "Some assets may have a zero dollar cost basis"
- ✅ "Your 1099-DA may show a $0 purchase price for some assets if we don't have this info. We'll guide you on how to update this when you file to potentially reduce your tax bill."
- ✅ "If we don't have your crypto's original purchase price (cost basis), your entire sale could be considered profit, which may lead to a much higher tax bill."

### Tax form formatting — severity: error

Use official IRS form names with proper formatting. (Inherits from \`05-formatting-numbers-dates.md\` but reinforced here.)

- ✅ "Form 1099-DA" — ❌ "1099DA" / "1099-DA" (missing "Form")
- ✅ "Forms W-2" — ❌ "Form W-2s"

### "Tax resident" — severity: suggestion

Per recent decision (Dor Levi, Bea Castaneda, Katrina): we don't have to say "tax resident" in the UI anymore. If you see it, suggest removing or rephrasing.

- ❌ "Confirm your tax resident status"
- ✅ "Confirm the country where you pay taxes"

## Content strategy patterns — flag deviations as suggestions

### Passive framing — severity: suggestion

Tax content should shift users from passive reception to guided preparation. Flag passive/surprising framing.

- ❌ "Here is your 1099-DA" (surprise — no context)
- ✅ "Heads up, new crypto tax rules are coming for 2025 filings! We're here to help you get ready."

### Cost basis confusion — severity: suggestion

If a screen asks users to provide cost basis info, it should abstract the complexity and reframe as a clear action.

- ❌ "Enter your cost basis for transferred assets"
- ✅ "Help us accurately calculate your crypto's original purchase price"

### Missing accountability — severity: suggestion

Coinbase should embrace accountability and offer proactive support, not deflect responsibility.

- ❌ "It's your responsibility to report crypto taxes"
- ✅ "Just a quick tax tip: Swapping crypto is a taxable event. Learn more."

### Myth-busting — severity: suggestion

If content touches on common misconceptions, it should demystify directly.

- ✅ "Swapping crypto (for example, BTC to ETH) is a taxable event, even if you don't convert to USD."

## Legal-sensitive terms in tax context — severity: warning

These terms are fine in Taxes context but have compliance implications elsewhere. Do not flag them as errors when used within tax flows:

- "cost basis" — required
- "capital gains" / "capital losses" — acceptable in tax context
- "taxable event" — acceptable in tax context
- "deduction" — acceptable in tax context
