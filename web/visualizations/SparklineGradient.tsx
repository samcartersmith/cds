import React, { forwardRef, memo, useMemo } from 'react';

import { SparklineBaseProps } from '@cbhq/cds-common/types';

import { useAccessibleForegroundGradient } from '../color/useAccessibleForegroundGradient';
import { SparklinePath, SparklinePathRef } from './SparklinePath';

export const SparklineGradient = memo(
  forwardRef<SparklinePathRef, SparklineBaseProps>(
    ({ color, path, height, width }, forwardedRef) => {
      const gradient = useAccessibleForegroundGradient({ color, usage: 'graphic' });
      const gradientId = `sparkline-gradient-${color}`;
      const linearGradient = useMemo(() => {
        return (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradient.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
              ))}
            </linearGradient>
          </defs>
        );
      }, [gradient, gradientId]);

      return (
        <svg width={width} height={height}>
          {linearGradient}
          <SparklinePath ref={forwardedRef} path={path} stroke={`url(#${gradientId})`} />
        </svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
