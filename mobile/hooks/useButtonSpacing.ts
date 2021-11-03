import { ViewStyle } from 'react-native';

import {
  useButtonSpacing as useSharedButtonSpacing,
  UseButtonSpacingParams,
} from '@cbhq/cds-common/hooks/useButtonSpacing';
import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useButtonSpacing = (params: UseButtonSpacingParams): ViewStyle => {
  const spacing = useSharedButtonSpacing(params);
  return useInternalSpacingStyles(spacing);
};
