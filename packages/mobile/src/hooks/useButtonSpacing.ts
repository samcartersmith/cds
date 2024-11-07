import { ViewStyle } from 'react-native';
import { getButtonSpacing, GetButtonSpacingParams } from '@cbhq/cds-common/utils/getButtonSpacing';

import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useButtonSpacing = ({
  compact,
  startIcon,
  endIcon,
  flush,
}: GetButtonSpacingParams): ViewStyle => {
  const buttonSpacingParams = getButtonSpacing({
    compact,
    startIcon,
    endIcon,
    flush,
  });
  const buttonSpacing = useInternalSpacingStyles(buttonSpacingParams);
  return buttonSpacing;
};
