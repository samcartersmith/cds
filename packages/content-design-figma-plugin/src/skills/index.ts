import system from './00-system.md?raw';
import capitalization from './01-capitalization.md?raw';
import punctuation from './02-punctuation.md?raw';
import vocabulary from './03-vocabulary.md?raw';
import grammar from './04-grammar-and-tone.md?raw';
import formatting from './05-formatting-numbers-dates.md?raw';
import components from './06-components-and-patterns.md?raw';
import errors from './07-errors-and-restrictions.md?raw';
import legal from './08-legal.md?raw';
import accessibility from './09-accessibility.md?raw';
import base from './10-base.md?raw';
import growth from './11-growth.md?raw';
import accountRestrictions from './12-account-restrictions.md?raw';
import taxes from './13-taxes.md?raw';
import onboarding from './14-onboarding.md?raw';
import scamPrevention from './15-scam-prevention.md?raw';

/**
 * System prompt: orchestration instructions, output format, and core principles only.
 * No inline rules — those are delivered on demand via tool calls.
 */
export const SKILLS_SYSTEM_PROMPT = system;

/**
 * Individual general guideline files keyed by category name.
 * Returned as tool call results when the model requests a specific category.
 */
export const SKILL_MAP: Record<string, string> = {
  capitalization,
  punctuation,
  vocabulary,
  grammar,
  formatting,
  components,
  errors,
  legal,
  accessibility,
};

/**
 * Product-specific override modules keyed by product area name.
 * Returned as tool call results when the model requests a product context.
 */
export const PRODUCT_MODULE_MAP: Record<string, string> = {
  base,
  growth,
  'account-restrictions': accountRestrictions,
  taxes,
  onboarding,
  'scam-prevention': scamPrevention,
};
