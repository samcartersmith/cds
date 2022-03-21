import type { ButtonBaseProps } from '../types';

import { memoize } from './memoize';

const defaultSpacing = 4;
const iconSpacing = 3;
const flushSpacing = 2;

export type GetButtonSpacingParams = {
  compact?: boolean;
  /** If present decrease horizontal padding since icons have built in white space. */
  startIcon?: ButtonBaseProps['startIcon'] | boolean;
  /** If present decrease horizontal padding since icons have built in white space. */
  endIcon?: ButtonBaseProps['endIcon'] | boolean;
  /** If present decrease horizontal padding */
  flush?: ButtonBaseProps['flush'] | boolean;
};

const getCacheKey = ({ compact, flush, startIcon, endIcon }: GetButtonSpacingParams) => {
  return `${compact}-${Boolean(flush)}-${Boolean(startIcon)}-${Boolean(endIcon)}`;
};

/** TODO: pull into common once web alpha Button is ready */
export const getButtonSpacingProps = memoize(function getButtonSpacingProps({
  startIcon,
  endIcon,
  flush,
}: GetButtonSpacingParams) {
  if (flush) {
    return {
      spacingStart: flushSpacing,
      spacingEnd: flushSpacing,
      offsetHorizontal: flushSpacing,
    } as const;
  }
  return {
    spacingStart: startIcon ? iconSpacing : defaultSpacing,
    spacingEnd: endIcon ? iconSpacing : defaultSpacing,
  } as const;
},
getCacheKey);
