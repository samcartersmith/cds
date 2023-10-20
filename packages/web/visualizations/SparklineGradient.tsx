import React, { forwardRef, memo, useId, useMemo, useRef } from 'react';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { useAccessibleForegroundGradient } from '../color/useAccessibleForegroundGradient';

import { SparklineAreaPattern } from './SparklineAreaPattern';
import { SparklinePath, SparklinePathRef } from './SparklinePath';

/**
 * @deprecated this component will be removed from CDS Q22023. It has been moved to cds-web-sparkline.
 */
export const SparklineGradient = memo(
  forwardRef<SparklinePathRef, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, forwardedRef) => {
      const randomId = useId();
      const patternId = useRef<string>(randomId);
      const gradient = useAccessibleForegroundGradient({ background, color, usage: 'graphic' });
      const areaColor = useAccessibleForeground({ background, color, usage: 'graphic' });
      const gradientId = background
        ? `sparkline-gradient-${background}-${color}`
        : `sparkline-gradient-${color}`;
      const cleanId = gradientId.replace('#', '');
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

      const hasChildren = !!children;
      const linearGradient = useMemo(() => {
        return (
          <defs>
            <linearGradient id={cleanId} x1="0%" x2="100%" y1="0%" y2="0%">
              {gradient.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
              ))}
            </linearGradient>
            {hasChildren && <SparklineAreaPattern color={areaColor} id={patternId.current} />}
          </defs>
        );
      }, [cleanId, gradient, hasChildren, areaColor]);

      return (
        <svg height={height} width={width}>
          {linearGradient}
          <g {...translateProps}>
            <SparklinePath ref={forwardedRef} path={path} stroke={`url(#${cleanId})`} />
            {generateSparklineAreaWithId(patternId.current, children)}
          </g>
        </svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
