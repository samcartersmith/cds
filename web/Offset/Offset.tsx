import * as React from 'react';

import { UseSpacingStylesProps } from '@cds/common';

import { useSpacingStyles } from '../hooks/useSpacingStyles';

export type OffsetProps = Omit<UseSpacingStylesProps, 'isInverted'>;

export const Offset: React.FC<OffsetProps> = ({
  all,
  top,
  bottom,
  start,
  end,
  horizontal,
  vertical,
  children,
}) => {
  const spacingStyles = useSpacingStyles({
    all: all,
    bottom: bottom,
    end: end,
    horizontal: horizontal,
    start: start,
    top: top,
    vertical: vertical,
    isInverted: true,
  });

  return <div className={spacingStyles}>{children}</div>;
};
