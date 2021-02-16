import * as React from 'react';

import { OffsetBaseProps } from '@cds/common';

import { useSpacingStyles } from '../hooks/useSpacingStyles';

export const Offset: React.FC<OffsetBaseProps> = ({
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
