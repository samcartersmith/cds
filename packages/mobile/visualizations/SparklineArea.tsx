import React, { forwardRef, memo } from 'react';
import { TextInput } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { SparklineAreaBaseProps } from '@cbhq/cds-common';

type SparklineAreaProps = {
  animatedArea?: SharedValue<string | undefined>;
} & SparklineAreaBaseProps;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const SparklineArea = memo(
  forwardRef<TextInput | null, SparklineAreaProps>(
    ({ area, animatedArea, patternId }: SparklineAreaProps, ref) => {
      const animatedProps = useAnimatedProps(() => ({
        d: animatedArea?.value,
      }));

      return animatedArea ? (
        <AnimatedPath fill={`url(#${patternId})`} animatedProps={animatedProps} />
      ) : (
        <Path ref={ref} d={area} fill={`url(#${patternId})`} />
      );
    },
  ),
);
