import { useMemo } from 'react';
import { emptyObject } from '@cbhq/cds-utils';

import { defaultSpacingConfig } from '../tokens/cell';
import { CellBaseProps } from '../types';

export const innerDefaults = defaultSpacingConfig.innerSpacing;
export const outerDefaults = defaultSpacingConfig.outerSpacing;

export type UseCellSpacingParams = Pick<
  CellBaseProps,
  'innerSpacing' | 'outerSpacing' | 'reduceHorizontalSpacing' | 'offsetHorizontal'
>;
/**
 * Takes the inner and outerSpacing props from the Cell component and merges with their default values.
 * Also, correctly handles the deprecated props of reduceHorizontalSpacing and offsetHorizontal when present.
 */
export function useCellSpacing({
  innerSpacing,
  outerSpacing,
  /** @deprecated Use innerSpacing={{ spacingHorizontal: xyz }} to override spacingHorizontal moving forward. */
  reduceHorizontalSpacing,
  /** @deprecated Use outerSpacing={{ offsetHorizontal: xyz }} to override offsetHorizontal moving forward. */
  offsetHorizontal = outerDefaults.offsetHorizontal,
}: UseCellSpacingParams | undefined = emptyObject) {
  return useMemo(
    () =>
      ({
        inner: {
          ...innerDefaults,
          spacingHorizontal: reduceHorizontalSpacing ? 1 : innerDefaults.spacingHorizontal,
          ...innerSpacing,
        },
        outer: {
          ...outerDefaults,
          offsetHorizontal,
          ...outerSpacing,
        },
      } as const),
    [innerSpacing, offsetHorizontal, outerSpacing, reduceHorizontalSpacing],
  );
}
