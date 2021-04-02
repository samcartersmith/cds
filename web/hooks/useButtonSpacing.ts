import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useButtonSpacing = (compact?: boolean): string => {
  return useInternalSpacingStyles({
    horizontal: compact ? 2 : 3,
    vertical: compact ? 1 : 2,
  });
};
