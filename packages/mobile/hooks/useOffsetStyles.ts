import { ViewStyle } from 'react-native';
import { OffsetProps } from '@cbhq/cds-common';

import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useOffsetStyles = ({
  offset,
  offsetBottom,
  offsetEnd,
  offsetHorizontal,
  offsetStart,
  offsetTop,
  offsetVertical,
}: OffsetProps): ViewStyle => {
  return useInternalSpacingStyles({
    all: offset,
    bottom: offsetBottom,
    end: offsetEnd,
    horizontal: offsetHorizontal,
    start: offsetStart,
    top: offsetTop,
    vertical: offsetVertical,
    isInverted: true,
  });
};
