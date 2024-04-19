import React, { forwardRef, memo, useId, useMemo, useRef } from 'react';
import { SparklineBaseProps } from '@cbhq/cds-common/types';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';
import { useAccessibleForeground } from '@cbhq/cds-web/color/useAccessibleForeground';
import { useAccessibleForegroundGradient } from '@cbhq/cds-web/color/useAccessibleForegroundGradient';

import { SparklineAreaPattern } from './SparklineAreaPattern';
import { SparklinePath, SparklinePathRef } from './SparklinePath';

export const SparklineGradient = memo(
  forwardRef<SparklinePathRef, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, forwardedRef) => {
      const patternId = useRef<string>(generateRandomId());
      const gradient = useAccessibleForegroundGradient({ background, color, usage: 'graphic' });
      const areaColor = useAccessibleForeground({ background, color, usage: 'graphic' });
      const gradientId = useId();
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

      const hasChildren = !!children;
      const linearGradient = useMemo(() => {
        return (
          <defs>
            <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
              {gradient.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
              ))}
            </linearGradient>
            {hasChildren && <SparklineAreaPattern color={areaColor} id={patternId.current} />}
          </defs>
        );
      }, [gradientId, gradient, hasChildren, areaColor]);

      return (
        <svg height={height} width={width}>
          {linearGradient}
          <g {...translateProps}>
            <SparklinePath ref={forwardedRef} path={path} stroke={`url(#${gradientId})`} />
            {generateSparklineAreaWithId(patternId.current, children)}
          </g>
        </svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
