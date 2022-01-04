import React, { forwardRef, memo, useMemo, useRef } from 'react';

import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { SparklineBaseProps } from '@cbhq/cds-common/types/SparklineBaseProps';
import { TextInput } from 'react-native';
import Svg, { G, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { useAccessibleForegroundGradient } from '../color/useAccessibleForegroundGradient';
import { SparklineAreaPattern } from './SparklineAreaPattern';
import { useAccessibleForeground } from '../color/useAccessibleForeground';

export const SparklineGradient = memo(
  forwardRef<TextInput | null, SparklineBaseProps>(
    ({ background, color, path, height, width, yAxisScalingFactor, children }, ref) => {
      const patternId = useRef<string>(generateRandomId());
      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);
      const gradient = useAccessibleForegroundGradient({ background, color, usage: 'graphic' });
      const areaColor = useAccessibleForeground({ background, color, usage: 'graphic' });
      const linearGradient = useMemo(() => {
        return (
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {gradient.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
              ))}
            </LinearGradient>
            {!!children && <SparklineAreaPattern id={patternId.current} color={areaColor} />}
          </Defs>
        );
      }, [areaColor, children, gradient]);

      return (
        <Svg width={width} height={height}>
          {linearGradient}
          <G {...translateProps}>
            <Path
              ref={ref}
              d={path}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={borderWidth.sparkline}
              stroke="url(#gradient)"
            />
            {generateSparklineAreaWithId(patternId.current, children)}
          </G>
        </Svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
