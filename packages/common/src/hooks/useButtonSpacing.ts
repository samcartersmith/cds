import { useFeatureFlag } from '../system/useFeatureFlag';
import { ButtonBaseProps, IconName, InternalSpacingProps } from '../types';

const defaultSpacing = 4;
const iconSpacing = 3;
const flushSpacing = 2;

export type UseButtonSpacingParams = {
  compact?: boolean;
  /** If present decrease horizontal padding since icons have built in white space. */
  startIcon?: IconName;
  /** If present decrease horizontal padding since icons have built in white space. */
  endIcon?: IconName;
  /** If present decrease horizontal padding */
  flush?: ButtonBaseProps['flush'];
};

export function useButtonSpacing({
  compact,
  startIcon,
  endIcon,
  flush,
}: UseButtonSpacingParams): InternalSpacingProps {
  const hasFrontier = useFeatureFlag('frontierButton');
  if (hasFrontier) {
    const spacing: InternalSpacingProps = {
      start: flush ? flushSpacing : defaultSpacing,
      end: flush ? flushSpacing : defaultSpacing,
    };
    if (!flush && startIcon) spacing.start = iconSpacing;
    if (!flush && endIcon) spacing.end = iconSpacing;
    return spacing;
  }

  return {
    start: flush === 'start' ? flushSpacing : undefined,
    end: flush === 'end' ? flushSpacing : undefined,
    horizontal: compact ? 2 : 3,
    vertical: compact ? 1 : 2,
  };
}
