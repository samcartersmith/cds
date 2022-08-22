import { useMemo } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';

/** hook that generates a random ID to associate labels or contextual information to a target element.
 * the generated ID should be passed via accessibilityLabelledBy or accessibilityHint to the target element
 * and passed as ID to the label or descriptive element */
export const useA11yId = (prefix?: string) =>
  useMemo(() => generateRandomId(prefix ?? 'a11y-id-'), [prefix]);
