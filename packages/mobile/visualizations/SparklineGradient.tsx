import React, { forwardRef, memo, useId, useMemo, useRef } from 'react';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import { borderWidth } from '@cbhq/cds-common/tokens/borderWidth';
import { SparklineBaseProps } from '@cbhq/cds-common/types/SparklineBaseProps';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { useAccessibleForegroundGradient } from '../color/useAccessibleForegroundGradient';

import { SparklineAreaPattern } from './SparklineAreaPattern';

/**
 * @deprecated this component will be removed from CDS in v6.0.0. It has been moved to cds-mobile-visualization.
 */
export const SparklineGradient = memo(
  forwardRef<Path | null, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, ref) => {
      const randomId = useId();
      const patternId = useRef<string>(randomId);
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);
      const gradient = useAccessibleForegroundGradient({ background, color, usage: 'graphic' });
      const areaColor = useAccessibleForeground({ background, color, usage: 'graphic' });

      const hasChildren = !!children;
      const linearGradient = useMemo(() => {
        return (
          <Defs>
            <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              {gradient.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
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
              strokeWidth={borderWidth.sparkline}
            />
            {generateSparklineAreaWithId(patternId.current, children)}
          </G>
        </Svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
