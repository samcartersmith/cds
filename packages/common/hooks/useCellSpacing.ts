import { useMemo } from 'react';
import { emptyObject } from '@cbhq/cds-utils';

import { defaultSpacingConfig } from '../tokens/cell';
import { CellBaseProps } from '../types';

export const innerDefaults = defaultSpacingConfig.innerPadding;
export const outerDefaults = defaultSpacingConfig.outerPadding;

export type UseCellSpacingParams = Pick<
  CellBaseProps,
  'innerSpacing' | 'outerSpacing' | 'innerPadding' | 'outerPadding'
>;
/**
 * Takes the inner and outerPadding props from the Cell component and merges with their default values.
 */
export function useCellSpacing({
  innerSpacing,
  outerSpacing,
  innerPadding,
  outerPadding,
}: UseCellSpacingParams | undefined = emptyObject) {
  return useMemo(
    () =>
      ({
        inner: {
          ...innerDefaults,
          spacingHorizontal:
            (innerSpacing?.spacing || innerPadding?.spacing) ?? innerDefaults.spacingHorizontal,
          spacingVertical:
            (innerSpacing?.spacing || innerPadding?.spacing) ?? innerDefaults.spacingVertical,
          ...(innerSpacing || innerPadding),
        },
        outer: {
          ...outerDefaults,
          spacingHorizontal:
            (outerSpacing?.spacing || outerPadding?.spacing) ?? outerDefaults.spacingHorizontal,
          spacingVertical:
            (outerSpacing?.spacing || outerPadding?.spacing) ?? outerDefaults.spacingVertical,
          ...(outerSpacing || outerPadding),
        },
      } as const),
    [innerSpacing, outerSpacing, innerPadding, outerPadding],
  );
}
