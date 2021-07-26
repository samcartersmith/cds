import React, { memo } from 'react';

import { SparklineBaseProps } from '@cbhq/cds-common/types';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { SparklinePath } from './SparklinePath';

export const Sparkline = memo(({ color, height, path, width }: SparklineBaseProps) => {
  const stroke = useAccessibleForeground({ color, usage: 'graphic' });
  return (
    <svg width={width} height={height}>
      <SparklinePath path={path} stroke={stroke} />
    </svg>
  );
});

Sparkline.displayName = 'Sparkline';
