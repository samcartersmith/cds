import React from 'react';

import type { OffsetBaseProps } from '@cbhq/cds-common';

import { useSpacingStyles } from '../hooks/useSpacingStyles';

export const Offset: React.FC<OffsetBaseProps> = ({ children, ...spacingProps }) => {
  const spacingStyles = useSpacingStyles({
    ...spacingProps,
    isInverted: true,
  });

  return <div className={spacingStyles}>{children}</div>;
};
