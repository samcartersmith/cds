import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { TextInput } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import Svg, { Defs, G, LinearGradient, Path, PathProps, Stop } from 'react-native-svg';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { SparklineBaseProps } from '@cbhq/cds-common/types/SparklineBaseProps';
import { generateSparklineAreaWithId } from '@cbhq/cds-common/visualizations/generateSparklineAreaWithId';
import { getSparklineTransform } from '@cbhq/cds-common/visualizations/getSparklineTransform';
import { generateRandomId } from '@cbhq/cds-utils';

import { useAccessibleForeground } from '../color/useAccessibleForeground';
import { useAccessibleForegroundGradient } from '../color/useAccessibleForegroundGradient';

import { SparklineAreaPattern } from './SparklineAreaPattern';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type SparklineGradientProps = {
  animatedPath?: SharedValue<string | undefined>;
} & SparklineBaseProps;

export const SparklineGradient = memo(
  forwardRef<TextInput | null, SparklineGradientProps>(
    (
      { background, color, path, animatedPath, height, width, yAxisScalingFactor, children },
      ref,
    ) => {
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

      const animatedPathProps = useAnimatedProps(() => ({
        d: animatedPath?.value,
      }));

      const sharedProps: PathProps = {
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
        strokeWidth: borderWidth.sparkline,
        stroke: 'url(#gradient)',
      };

      return (
        <Svg width={width} height={height} ref={ref}>
          {linearGradient}
          <G {...translateProps}>
            {animatedPath ? (
              <AnimatedPath {...sharedProps} animatedProps={animatedPathProps} />
            ) : (
              <Path d={path} {...sharedProps} />
            )}
            {generateSparklineAreaWithId(patternId.current, children)}
          </G>
        </Svg>
      );
    },
  ),
);

SparklineGradient.displayName = 'SparklineGradient';
