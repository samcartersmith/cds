import { useMemo } from 'react';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import { CellBaseProps } from '@cbhq/cds-common2/types/CellBaseProps';
import { emptyObject } from '@cbhq/cds-utils';

/** Default spacing config */
export const defaultSpacingConfig = {
  innerSpacing: {
    paddingX: 2,
    paddingY: 1,
    marginX: -2,
  },
  outerSpacing: {
    paddingX: gutter,
    paddingY: 1,
    marginX: 0,
  },
} as const;

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
          paddingX: innerSpacing?.paddingX ?? innerDefaults.paddingX,
          paddingY: innerSpacing?.paddingY ?? innerDefaults.paddingY,
          ...innerSpacing,
        },
        outer: {
          ...outerDefaults,
          paddingX: outerSpacing?.paddingX ?? outerDefaults.paddingX,
          paddingY: outerSpacing?.paddingY ?? outerDefaults.paddingY,
          ...outerSpacing,
        },
      } as const),
    [innerSpacing, outerSpacing],
  );
}
