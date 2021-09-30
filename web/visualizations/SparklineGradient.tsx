import React, { forwardRef, memo, useMemo } from 'react';

import { SparklineBaseProps } from '@cbhq/cds-common/types';

import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { useAccessibleForegroundGradient } from '../color/useAccessibleForegroundGradient';
import { SparklinePath, SparklinePathRef } from './SparklinePath';

export const SparklineGradient = memo(
  forwardRef<SparklinePathRef, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor }, forwardedRef) => {
      const gradient = useAccessibleForegroundGradient({ background, color, usage: 'graphic' });
      const gradientId = background
        ? `sparkline-gradient-${background}-${color}`
        : `sparkline-gradient-${color}`;
      const cleanId = gradientId.replace('#', '');
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);
      const linearGradient = useMemo(() => {
        return (
          <defs>
            <linearGradient id={cleanId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradient.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
              ))}
            </linearGradient>
          </defs>
        );
      }, [gradient, cleanId]);

      return (
        <svg width={width} height={height}>
          {linearGradient}
          <g {...translateProps}>
            <SparklinePath ref={forwardedRef} path={path} stroke={`url(#${cleanId})`} />
          </g>
        </svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
