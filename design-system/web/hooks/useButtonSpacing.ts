import {
  useButtonSpacing as useSharedButtonSpacing,
  UseButtonSpacingParams,
} from '@cbhq/cds-common/hooks/useButtonSpacing';
import { useInternalSpacingStyles } from './internal/useInternalSpacingStyles';

export const useButtonSpacing = (params: UseButtonSpacingParams): string => {
  const spacing = useSharedButtonSpacing(params);
  return useInternalSpacingStyles(spacing);
};
