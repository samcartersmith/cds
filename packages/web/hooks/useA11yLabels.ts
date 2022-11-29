import { useMemo } from 'react';
import { SharedAccessibilityProps } from '@cbhq/cds-common';

import { useA11yId } from './useA11yId';

type Options = {
  labelledByIdPrefix?: string;
} & Pick<SharedAccessibilityProps, 'accessibilityLabelledBy' | 'accessibilityLabel'>;

/**
 * @typedef {Object} A11yLabels
 * @property {(string|undefined)} labelledBySource - If generated, the random id to be set on text element which `aria-labelledby` will reference.
 * @property {(string|undefined)} labelledBy - Id reference to use with `aria-labelledby` on element requiring context.
 * @property {(string|undefined)} label - Text to use with `aria-label` on element requiring context.
 */

/**
 *
 * Hook to manage generation and prioritization of accessibility labels.
 *
 * If neither the `accessibilityLabelledBy` nor `accessibilityLabel` params are defined,
 * then a random id is generated with the provided prefix (if any)
 * and returned via the `labelledBySource` and `labelledBy` props for use with `aria-labelledby`.
 *
 * If either `accessibilityLabelledBy` or `accessibilityLabel` is defined, then the random id is not generated
 * and the value is simply passed through to either the `labelledBy` or `label` prop, respectively.
 * `labelledBySource` is undefined.
 *
 * If both `accessibilityLabelledBy` or `accessibilityLabel` are defined, then again the random id is not generated,
 * and `accessibilityLabelledBy` is prioritized and passed through to `labelledBy` while `labelledBySource` and `label` are `undefined`.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.labelledByIdPrefix] - String to prefix to the generated id.
 * @param {string} [options.accessibilityLabelledBy] - Element id to use with `aria-labelledby`.
 * @param {string} [options.accessibilityLabel] - Text to use with `aria-label`.
 * @returns {A11yLabels}
 */
export const useA11yLabels = ({
  labelledByIdPrefix,
  accessibilityLabelledBy,
  accessibilityLabel,
}: Options = {}) => {
  const labelledById = useA11yId({
    prefix: labelledByIdPrefix,
    shouldNotGenerate: !!(accessibilityLabelledBy ?? accessibilityLabel),
  });

  return useMemo(
    () => ({
      labelledBySource: labelledById,
      labelledBy: accessibilityLabelledBy ?? labelledById,
      label: accessibilityLabelledBy ? undefined : accessibilityLabel,
    }),
    [labelledById, accessibilityLabelledBy, accessibilityLabel],
  );
};
