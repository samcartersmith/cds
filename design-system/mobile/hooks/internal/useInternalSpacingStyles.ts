import { InternalSpacingProps, useScale } from '@cbhq/cds-common';
import { ViewStyle } from 'react-native';

import { getSpacingStyles } from '../../styles/getSpacingStyles';

export type UseInternalSpacingStylesProps = InternalSpacingProps;

export const useInternalSpacingStyles = ({
  all,
  bottom,
  top,
  start,
  end,
  vertical,
  horizontal,
  isInverted = false,
}: UseInternalSpacingStylesProps): ViewStyle => {
  const scale = useScale();
  return getSpacingStyles({
    all,
    bottom,
    top,
    start,
    end,
    vertical,
    horizontal,
    isInverted,
    scale,
  });
};
