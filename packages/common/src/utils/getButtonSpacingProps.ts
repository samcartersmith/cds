import type { ButtonBaseProps } from '../types';

import { memoize } from './memoize';

const defaultSpacing = 4;
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
  const strings = [];
  if (compact) strings.push('compact');
  if (flush) strings.push(flush);
  if (startIcon) strings.push(startIcon);
  if (endIcon) strings.push(endIcon);
  const key = strings.join('-');
  return key;
};

export const getButtonSpacingProps = memoize(function getButtonSpacingProps({
  compact,
  flush,
}: GetButtonSpacingParams) {
  if (flush) {
    return {
      spacingStart: flushSpacing,
      spacingEnd: flushSpacing,
      offsetEnd: flush === 'end' ? flushSpacing : undefined,
      offsetStart: flush === 'start' ? flushSpacing : undefined,
    } as const;
  }
  return {
    spacingStart: compact ? flushSpacing : defaultSpacing,
    spacingEnd: compact ? flushSpacing : defaultSpacing,
  } as const;
},
getCacheKey);
