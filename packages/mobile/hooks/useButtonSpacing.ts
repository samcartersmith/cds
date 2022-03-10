import { ViewStyle } from 'react-native';
import { getButtonSpacing, GetButtonSpacingParams } from '@cbhq/cds-common/utils/getButtonSpacing';

import { useFeatureFlag } from '../system/useFeatureFlag';

import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useButtonSpacing = ({
  compact,
  startIcon,
  endIcon,
  flush,
}: GetButtonSpacingParams): ViewStyle => {
  const hasFrontier = useFeatureFlag('frontierButton');
  const frontierSpacingParams = getButtonSpacing({
    compact,
    startIcon,
    endIcon,
    flush,
    hasFrontier,
  });
  const frontierSpacing = useInternalSpacingStyles(frontierSpacingParams);
  const nonFrontierSpacing = useInternalSpacingStyles({
    horizontal: compact ? 2 : 3,
    vertical: compact ? 0.5 : 1,
  });
  if (hasFrontier) return frontierSpacing;
  return nonFrontierSpacing;
};
