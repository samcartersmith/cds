import React, { forwardRef, memo, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle, CircleProps, G } from 'react-native-svg';
import { SharedProps } from '@cbhq/cds-common2';
import { animateProgressBaseSpec } from '@cbhq/cds-common2/animation/progress';
import {
  ProgressCircleBaseProps,
  ProgressCircleTextBaseProps,
  ProgressInnerCircleBaseProps,
} from '@cbhq/cds-common2/types/ProgressCircleBaseProps';
import { VisualizationContainerDimension } from '@cbhq/cds-common2/types/VisualizationContainerBaseProps';
import { getCircumference, getRadius } from '@cbhq/cds-common2/utils/circle';
import { getProgressCircleParams } from '@cbhq/cds-common2/visualizations/getProgressCircleParams';
import { useProgressSize } from '@cbhq/cds-common2/visualizations/useProgressSize';
import { isTest } from '@cbhq/cds-utils';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';

import { ProgressTextLabel } from './ProgressTextLabel';
import { VisualizationContainer } from './VisualizationContainer';

type CircleType = React.ComponentClass<CircleProps & SharedProps>;
const AnimatedCircle = Animated.createAnimatedComponent(Circle as CircleType);

const ProgressCircleText = memo(({ progress, disabled }: ProgressCircleTextBaseProps) => {
  return (
    <Box alignItems="center" height="100%" justifyContent="center" position="absolute" width="100%">
      <Box alignSelf="center" flexGrow={0} flexShrink={0}>
        <ProgressTextLabel color="fgMuted" disabled={disabled} value={Math.round(progress * 100)} />
      </Box>
    </Box>
  );
});

const ProgressCircleInner = memo(
  ({ size, progress, color, weight, visuallyDisabled }: ProgressInnerCircleBaseProps) => {
    const strokeWidth = useProgressSize(weight);
    const theme = useTheme();
    const circleRef = useRef<React.Component<CircleProps>>(null);

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
        ref={!isTest() ? circleRef : undefined} // This is required because Circle is mocked in the unit test to support testID. The mock does not support refs
        strokeDasharray={circumference}
        strokeDashoffset={animatedStrokeDashOffset.current}
        strokeLinecap={progress > 0 ? 'round' : 'butt'}
        testID="cds-progress-circle-inner"
        {...getProgressCircleParams({
          size,
          strokeWidth,
          stroke: !visuallyDisabled ? theme.color[color] : theme.color.bgLineHeavy,
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
        // Default is empty string due to iOS VoiceOver repeating percentage multiple times when
        // a11y label isn't specified
        accessibilityLabel = '',
        color = 'bgPrimary',
        disabled = false,
        testID,
        hideText,
        size,
      }: ProgressCircleBaseProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const theme = useTheme();
      const strokeWidth = useProgressSize(weight);

      const visSize = size ?? '100%';
      return (
        <VisualizationContainer height={visSize} width={visSize}>
          {({ width, height, circleSize }: VisualizationContainerDimension) => (
            <Box
              ref={forwardedRef}
              accessible
              accessibilityLabel={accessibilityLabel}
              accessibilityRole="progressbar"
              accessibilityValue={{
                min: 0,
                max: 100,
                now: progress * 100,
              }}
              alignItems="center"
              height={height}
              justifyContent="center"
              testID={testID}
              width={width}
            >
              <Box flexGrow={0} flexShrink={0} height={circleSize} width={circleSize}>
                <Svg
                  key={circleSize}
                  height={circleSize}
                  viewBox={`0 0 ${circleSize} ${circleSize}`}
                  width={circleSize}
                >
                  <G origin={`${circleSize / 2}, ${circleSize / 2}`} rotation={-90}>
                    <Circle
                      {...getProgressCircleParams({
                        size: circleSize,
                        strokeWidth,
                        stroke: theme.color.bgLine,
                      })}
                    />
                    <ProgressCircleInner
                      color={color}
                      progress={progress}
                      size={circleSize}
                      visuallyDisabled={disabled}
                      weight={weight}
                    />
                  </G>
                </Svg>
                {!hideText && <ProgressCircleText disabled={disabled} progress={progress} />}
              </Box>
            </Box>
          )}
        </VisualizationContainer>
      );
    },
  ),
);
