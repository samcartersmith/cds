import { useMemo } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';
/*
 *
 * prefix         - an optional param for prefix naming the a11y Id
 * shouldGenerate - an optional boolean variable indicating whether this a11y-Id
 *                  should be generated or not.
 * */
type UseA11yIdType = Partial<{
  prefix: string;
  shouldNotGenerate: boolean;
}>;

/** hook that generates a random ID to associate labels or contextual information to a target element.
 * the generated ID should be passed via accessibilityLabelledBy or accessibilityHint to the target element
 * and passed as ID to the label or descriptive element
 * */
export const useA11yId = (options: UseA11yIdType = {}) =>
  useMemo(() => {
    if (options?.shouldNotGenerate) {
      return undefined;
    }
    return generateRandomId(options?.prefix ?? 'a11y-id-');
  }, [options?.prefix, options?.shouldNotGenerate]);
