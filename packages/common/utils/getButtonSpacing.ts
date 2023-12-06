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
  /** If frontierButton feature flag is on/off */
  hasFrontier?: boolean;
};

const getCacheKey = ({
  compact,
  flush,
  hasFrontier,
  startIcon,
  endIcon,
}: GetButtonSpacingParams) => {
  return `${compact}-${flush}-${hasFrontier}-${startIcon}-${endIcon}`;
};

/** @deprecated will be removed in v6.0.0 Please use getButtonSpacingProps moving forward */
export const getButtonSpacing = memoize(function getButtonSpacing({
  compact,
  flush,
  hasFrontier,
}: GetButtonSpacingParams): InternalSpacingProps {
  // Frontier Web Button styles are pulled from here
  if (hasFrontier) {
    const spacing: InternalSpacingProps = {
      start: flush || compact ? flushSpacing : defaultSpacing,
      end: flush || compact ? flushSpacing : defaultSpacing,
    };
    return spacing;
  }

  return {
    start: flush === 'start' ? flushSpacing : undefined,
    end: flush === 'end' ? flushSpacing : undefined,
    horizontal: compact ? 2 : 3,
    vertical: compact ? 1 : 2,
  };
},
getCacheKey);
