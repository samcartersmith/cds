import { ButtonBaseProps, IconName, InternalSpacingProps } from '../types';

import { memoize } from './memoize';

const defaultSpacing = 4;
const flushSpacing = 2;

export type GetButtonSpacingParams = {
  compact?: boolean;
  /** If present decrease horizontal padding since icons have built in white space. */
  startIcon?: IconName;
  /** If present decrease horizontal padding since icons have built in white space. */
  endIcon?: IconName;
  /** If present decrease horizontal padding */
  flush?: ButtonBaseProps['flush'];
};

const getCacheKey = ({ compact, flush, startIcon, endIcon }: GetButtonSpacingParams) => {
  return `${compact}-${flush}-${startIcon}-${endIcon}`;
};

export const getButtonSpacing = memoize(function getButtonSpacing({
  compact,
  flush,
}: GetButtonSpacingParams): InternalSpacingProps {
  // Web Button styles are pulled from here
  const spacing: InternalSpacingProps = {
    start: flush || compact ? flushSpacing : defaultSpacing,
    end: flush || compact ? flushSpacing : defaultSpacing,
  };
  return spacing;
},
getCacheKey);
