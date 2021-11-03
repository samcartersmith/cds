import { IconName, InternalSpacingProps } from '../types';
import { useFeatureFlag } from '../system/useFeatureFlag';

const defaultSpacing = 4;
const iconSpacing = 3;

export type UseButtonSpacingParams = {
  compact?: boolean;
  /** If present decrease horizontal padding since icons have built in white space. */
  startIcon?: IconName;
  /** If present decrease horizontal padding since icons have built in white space. */
  endIcon?: IconName;
};

export function useButtonSpacing({
  compact,
  startIcon,
  endIcon,
}: UseButtonSpacingParams): InternalSpacingProps {
  const hasFrontier = useFeatureFlag('frontierButton');
  if (hasFrontier) {
    const spacing: InternalSpacingProps = {
      start: defaultSpacing,
      end: defaultSpacing,
    };
    if (startIcon) spacing.start = iconSpacing;
    if (endIcon) spacing.end = iconSpacing;
    return spacing;
  }
  return {
    horizontal: compact ? 2 : 3,
    vertical: compact ? 1 : 2,
  };
}
