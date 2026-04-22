# Product Module: Onboarding

> Apply these rules ONLY when the designer specifies Onboarding as the product area, or when the screen context clearly shows account setup, sign-up, identity verification, SMS or email confirmation, 2FA enrollment, or first-run education.

## Principles

Use progressive disclosure, reduce anxiety, and give every step a clear primary action. Do not surprise users with irreversible actions without confirmation.

#### A. Sending a verification code — severity: error, strict pattern

When a headline relates to sending a verification code to a user, it MUST follow this exact pattern:

"Enter the code we [sent/emailed/texted] you"

Choose the verb based on the delivery method:

- Email: "Enter the code we emailed you"
- SMS/text: "Enter the code we texted you"
- Generic/unknown: "Enter the code we sent you"

If a headline is about a verification code and does NOT follow this pattern, flag it as an error and propose the correct pattern as the replacement.

Examples of WRONG headlines and their corrections:

- ❌ "We sent you a code" → ✅ "Enter the code we sent you"
- ❌ "We sent you an email" → ✅ "Enter the code we emailed you"
- ❌ "Check your email for a code" → ✅ "Enter the code we emailed you"
- ❌ "A code has been sent" → ✅ "Enter the code we sent you"
- ❌ "Verification code sent" → ✅ "Enter the code we sent you"
- ❌ "Enter your verification code" → ✅ "Enter the code we sent you"
- ❌ "We emailed you a code" → ✅ "Enter the code we emailed you"

The proposedText MUST be one of these three exact strings:

1. "Enter the code we sent you"
2. "Enter the code we emailed you"
3. "Enter the code we texted you"

Do NOT invent alternative phrasings. Do NOT paraphrase. Use the exact pattern.

## Identity and documents — severity: warning

- After upload or submit, say what happens next (wait time, email notice, resend path).
- Do not blame the user for system-side failures; mirror "blame the system" guidance from the errors and account-restriction skills.

## Marketing or optional steps — severity: warning

- Required compliance or security steps must not be hidden behind optional marketing consent or secondary modals.
- Referrals or upsells may appear but must not block completion of mandatory onboarding.

## Interaction with protected error headlines

If copy is a protected error headline under skills/07-errors-and-restrictions.md, do not reframe it using onboarding tone rules. Those rules apply to voluntary setup flows, not hard system errors.
