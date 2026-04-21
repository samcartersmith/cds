# Accessibility Rules

## Spatial references — severity: warning

- Don't reference spatial positioning: ❌ "Tap the button below", "See the section on the left"
- Directional words (left, right) may not be accurate in all languages
- "Above" and "below" OK when referring to read order, not visual position

## UI element references — severity: suggestion

Avoid directly referencing interface elements unless absolutely necessary for comprehension.

- ❌ "Tap the blue button"
- ✅ Frame as an action without referencing the element

## Color reliance — severity: warning

Error states, success states, etc. should include text or an icon — not just color.

## Link text — severity: warning

- Avoid ambiguous link text like standalone "Learn more" without context
- Links must make sense if read out of context

## Plain language — severity: suggestion

- Avoid jargon and idioms
- Keep sentences short and direct
