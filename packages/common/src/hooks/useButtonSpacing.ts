import { ButtonBaseProps, IconName, InternalSpacingProps } from '../types';
import { getButtonSpacing } from '../utils/getButtonSpacing';

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
  return getButtonSpacing({ compact, startIcon, endIcon, flush });
}
