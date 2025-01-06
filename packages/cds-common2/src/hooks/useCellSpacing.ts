import { useMemo } from 'react';

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
}: UseCellSpacingParams | undefined = {}) {
  return useMemo(
    () =>
      ({
        inner: {
          ...innerDefaults,
          paddingX: innerSpacing?.padding ?? innerDefaults.paddingX,
          paddingY: innerSpacing?.padding ?? innerDefaults.paddingY,
          ...innerSpacing,
        },
        outer: {
          ...outerDefaults,
          paddingX: outerSpacing?.padding ?? outerDefaults.paddingX,
          paddingY: outerSpacing?.padding ?? outerDefaults.paddingY,
          ...outerSpacing,
        },
      } as const),
    [innerSpacing, outerSpacing],
  );
}
