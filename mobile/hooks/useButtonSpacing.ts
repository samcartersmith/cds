import { ViewStyle } from 'react-native';

import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useButtonSpacing = (compact?: boolean): ViewStyle => {
  return useInternalSpacingStyles({
    horizontal: compact ? 2 : 3,
    vertical: compact ? 0.5 : 1,
  });
};
