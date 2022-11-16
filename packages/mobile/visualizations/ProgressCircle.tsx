import React, { forwardRef, memo, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle, CircleProps, G } from 'react-native-svg';
import { ForwardedRef, SharedProps } from '@cbhq/cds-common';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import {
  ProgressCircleBaseProps,
  ProgressCircleTextBaseProps,
  ProgressInnerCircleBaseProps,
} from '@cbhq/cds-common/types/ProgressCircleBaseProps';
import { VisualizationContainerDimension } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { getProgressCircleParams } from '@cbhq/cds-common/visualizations/getProgressCircleParams';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';
import { isTest } from '@cbhq/cds-utils';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout';

import { ProgressTextLabel } from './ProgressTextLabel';
import { VisualizationContainer } from './VisualizationContainer';

type CircleType = React.ComponentClass<CircleProps & SharedProps>;
const AnimatedCircle = Animated.createAnimatedComponent(Circle as CircleType);

const ProgressCircleText: React.FC<ProgressCircleTextBaseProps> = memo(({ progress, disabled }) => {
  return (
    <Box width="100%" height="100%" position="absolute" justifyContent="center" alignItems="center">
      <Box flexGrow={0} flexShrink={0} alignSelf="center">
        <ProgressTextLabel
          value={Math.round(progress * 100)}
          disabled={disabled}
          color="foregroundMuted"
        />
      </Box>
    </Box>
  );
});

const ProgressCircleInner: React.FC<ProgressInnerCircleBaseProps> = memo(
  ({ size, progress, color, weight, visuallyDisabled }) => {
    const strokeWidth = useProgressSize(weight);
    const palette = usePalette();
    const circleRef = useRef<typeof AnimatedCircle | undefined>();

    const circumference = getCircumference(getRadius(size, strokeWidth));
    const animatedStrokeDashOffset = React.useRef(new Animated.Value(circumference));

    useEffect(() => {
      const strokeDashoffset = circumference - circumference * progress;

      Animated.timing(
        animatedStrokeDashOffset.current,
        convertMotionConfig({
          toValue: strokeDashoffset,
          ...animateProgressBaseSpec,
          useNativeDriver: true,
        }),
      ).start();
    }, [circumference, progress, animatedStrokeDashOffset]);

    return (
      <AnimatedCircle
        testID="cds-progress-circle-inner"
        // This is required because Circle is mocked in the unit test to support testID. The mock does not support refs
        ref={!isTest() ? circleRef : undefined}
        strokeDasharray={circumference}
        strokeDashoffset={animatedStrokeDashOffset.current}
        strokeLinecap={progress > 0 ? 'round' : 'butt'}
        {...getProgressCircleParams({
          size,
          strokeWidth,
          stroke: !visuallyDisabled ? palette[color] : palette.lineHeavy,
        })}
      />
    );
  },
);

export const ProgressCircle = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        color = 'primary',
        disabled = false,
        testID,
        hideText,
        size,
      }: ProgressCircleBaseProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const strokeWidth = useProgressSize(weight);
      const palette = usePalette();

      const visSize = size ?? '100%';
      return (
        <VisualizationContainer width={visSize} height={visSize}>
          {({ width, height, circleSize }: VisualizationContainerDimension) => (
            <Box
              testID={testID}
              alignItems="center"
              justifyContent="center"
              width={width}
              height={height}
              ref={forwardedRef}
            >
              <Box flexGrow={0} flexShrink={0} width={circleSize} height={circleSize}>
                <Svg
                  key={circleSize}
                  width={circleSize}
                  height={circleSize}
                  viewBox={`0 0 ${circleSize} ${circleSize}`}
                >
                  <G rotation={-90} origin={`${circleSize / 2}, ${circleSize / 2}`}>
                    <Circle
                      {...getProgressCircleParams({
                        size: circleSize,
                        strokeWidth,
                        stroke: palette.line,
                      })}
                    />
                    <ProgressCircleInner
                      progress={progress}
                      color={color}
                      size={circleSize}
                      weight={weight}
                      visuallyDisabled={disabled}
                    />
                  </G>
                </Svg>
                {!hideText && <ProgressCircleText progress={progress} disabled={disabled} />}
              </Box>
            </Box>
          )}
        </VisualizationContainer>
      );
    },
  ),
);
