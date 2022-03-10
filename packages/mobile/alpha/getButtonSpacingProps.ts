import { memoize } from '@cbhq/cds-common/utils/memoize';

import type { ButtonProps } from './Button';

const defaultSpacing = 4;
const iconSpacing = 3;
const flushSpacing = 2;

export type GetButtonSpacingParams = {
  compact?: boolean;
  /** If present decrease horizontal padding since icons have built in white space. */
  startIcon?: ButtonProps['startIcon'] | boolean;
  /** If present decrease horizontal padding since icons have built in white space. */
  endIcon?: ButtonProps['endIcon'] | boolean;
  /** If present decrease horizontal padding */
  flush?: ButtonProps['flush'] | boolean;
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
