import { SpacingProps } from '@cbhq/cds-common';

import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useSpacingStyles = ({
  spacing,
  spacingBottom,
  spacingEnd,
  spacingHorizontal,
  spacingStart,
  spacingTop,
  spacingVertical,
}: SpacingProps): string => {
  return useInternalSpacingStyles({
    all: spacing,
    bottom: spacingBottom,
    end: spacingEnd,
    horizontal: spacingHorizontal,
    start: spacingStart,
    top: spacingTop,
    vertical: spacingVertical,
  });
};
