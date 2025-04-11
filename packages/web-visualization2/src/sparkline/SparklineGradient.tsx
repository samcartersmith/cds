import React, { forwardRef, memo, useId, useMemo, useRef } from 'react';
import { getAccessibleForegroundGradient } from '@cbhq/cds-common2/color/getAccessibleForegroundGradient';
import { SparklineBaseProps } from '@cbhq/cds-common2/types';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';
import { generateSparklineAreaWithId } from '@cbhq/cds-common2/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common2/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';
import { useTheme } from '@cbhq/cds-web2/hooks/useTheme';

import { SparklineAreaPattern } from './SparklineAreaPattern';
import { SparklinePath, SparklinePathRef } from './SparklinePath';

export const SparklineGradient = memo(
  forwardRef<SparklinePathRef, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, forwardedRef) => {
      const theme = useTheme();
      const patternId = useRef<string>(generateRandomId());
      const gradient = getAccessibleForegroundGradient({
        background: background ?? theme.color.bg,
        color,
        colorScheme: theme.activeColorScheme,
        usage: 'graphic',
      });
      const areaColor =
        color !== 'auto'
          ? color
          : getAccessibleColor({
              background: background ?? theme.color.bg,
              foreground: 'auto',
              usage: 'graphic',
            });
      const gradientId = useId();
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);

      const hasChildren = !!children;
      const linearGradient = useMemo(() => {
        return (
          <defs>
            <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
              {gradient.map((item, i) => (
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
