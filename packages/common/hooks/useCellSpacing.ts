import { useMemo } from 'react';
import { emptyObject } from '@cbhq/cds-utils';

import { defaultSpacingConfig } from '../tokens/cell';
import { CellBaseProps } from '../types';

export const innerDefaults = defaultSpacingConfig.innerSpacing;
export const outerDefaults = defaultSpacingConfig.outerSpacing;

export type UseCellSpacingParams = Pick<CellBaseProps, 'innerSpacing' | 'outerSpacing'>;
/**
 * Takes the inner and outerSpacing props from the Cell component and merges with their default values.
 */
export function useCellSpacing({
  innerSpacing,
  outerSpacing,
}: UseCellSpacingParams | undefined = emptyObject) {
  return useMemo(
    () =>
      ({
        inner: {
          ...innerDefaults,
          spacingHorizontal: innerSpacing?.spacing ?? innerDefaults.spacingHorizontal,
          spacingVertical: innerSpacing?.spacing ?? innerDefaults.spacingVertical,
          ...innerSpacing,
        },
        outer: {
          ...outerDefaults,
          spacingHorizontal: outerSpacing?.spacing ?? outerDefaults.spacingHorizontal,
          spacingVertical: outerSpacing?.spacing ?? outerDefaults.spacingVertical,
          ...outerSpacing,
        },
      } as const),
    [innerSpacing, outerSpacing],
  );
}
