import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { Defs, G, LinearGradient, Path, Stop, Svg } from 'react-native-svg';
import { getAccessibleForegroundGradient } from '@cbhq/cds-common2/color/getAccessibleForegroundGradient';
import { borderWidth } from '@cbhq/cds-common2/tokens/sparkline';
import { SparklineBaseProps } from '@cbhq/cds-common2/types/SparklineBaseProps';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';
import { generateSparklineAreaWithId } from '@cbhq/cds-common2/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common2/visualizations/getSparklineTransform';
import { useTheme } from '@cbhq/cds-mobile2/hooks/useTheme';
import { generateRandomId } from '@cbhq/cds-utils';

import { SparklineAreaPattern } from './SparklineAreaPattern';

export const SparklineGradient = memo(
  forwardRef<Path | null, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, ref) => {
      const theme = useTheme();
      const patternId = useRef<string>(generateRandomId());
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);
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

      const hasChildren = !!children;
      const linearGradient = useMemo(() => {
        return (
          <Defs>
            <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              {gradient.map((item, i) => (
                <Stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
              ))}
            </LinearGradient>
            {hasChildren && <SparklineAreaPattern color={areaColor} id={patternId.current} />}
          </Defs>
        );
      }, [areaColor, hasChildren, gradient]);

      return (
        <Svg fill="none" height={height} width={width}>
          {linearGradient}
          <G {...translateProps}>
            <Path
              ref={ref}
              d={path}
              stroke="url(#gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={borderWidth}
            />
            {generateSparklineAreaWithId(patternId.current, children)}
          </G>
        </Svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
