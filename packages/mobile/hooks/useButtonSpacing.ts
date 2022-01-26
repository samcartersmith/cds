import { ViewStyle } from 'react-native';
import {
  useButtonSpacing as useSharedButtonSpacing,
  UseButtonSpacingParams,
} from '@cbhq/cds-common/hooks/useButtonSpacing';

import { useFeatureFlag } from '../system/useFeatureFlag';

import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useButtonSpacing = (params: UseButtonSpacingParams): ViewStyle => {
  const hasFrontier = useFeatureFlag('frontierButton');
  const frontierSpacingParams = useSharedButtonSpacing(params);
  const frontierSpacing = useInternalSpacingStyles(frontierSpacingParams);
  const nonFrontierSpacing = useInternalSpacingStyles({
    horizontal: params.compact ? 2 : 3,
    vertical: params.compact ? 0.5 : 1,
  });
  if (hasFrontier) return frontierSpacing;
  return nonFrontierSpacing;
};
