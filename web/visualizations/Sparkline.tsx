import React, { memo } from 'react';

import { SparklineBaseProps } from '@cbhq/cds-common/types';

import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { SparklinePath } from './SparklinePath';

export const Sparkline = memo(
  ({ background, color, height, path, width, yAxisScalingFactor }: SparklineBaseProps) => {
    const stroke = useAccessibleForeground({ background, color, usage: 'graphic' });
    const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);
    return (
      <svg width={width} height={height}>
        <g {...translateProps}>
          <SparklinePath path={path} stroke={stroke} />
        </g>
      </svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
