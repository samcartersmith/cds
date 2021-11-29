import React, { memo, useEffect, useRef } from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import { Animated } from 'react-native';
import {
  ProgressCircleBaseProps,
  ProgressCircleTextBaseProps,
  ProgressInnerCircleBaseProps,
} from '@cbhq/cds-common/types/ProgressCircleBaseProps';
import { getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';
import { VisualizationContainerDimension } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { getProgressCircleParams } from '@cbhq/cds-common/visualizations/getProgressCircleParams';
import { VisualizationContainer } from './VisualizationContainer';
import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Box } from '../layout';
import { usePalette } from '../hooks/usePalette';
import { ProgressTextLabel } from './ProgressTextLabel';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
  ({ size, progress, color, weight, disabled }) => {
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
        ref={circleRef}
        strokeDasharray={circumference}
        strokeDashoffset={animatedStrokeDashOffset.current}
        strokeLinecap={progress > 0 ? 'round' : 'butt'}
        {...getProgressCircleParams({
          size,
          strokeWidth,
          stroke: !disabled ? palette[color] : palette.lineHeavy,
        })}
      />
    );
  },
);

export const ProgressCircle: React.FC<ProgressCircleBaseProps> = memo(
  ({
    weight = 'normal',
    progress,
    color = 'primary',
    disabled = false,
    testID,
    hideText,
    size = '100%',
  }) => {
    const strokeWidth = useProgressSize(weight);
    const palette = usePalette();

    return (
      <VisualizationContainer width={size} height={size}>
        {({ width, height, circleSize }: VisualizationContainerDimension) => (
          <Box
            testID={testID}
            alignItems="center"
            justifyContent="center"
            width={width}
            height={height}
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
                    disabled={disabled}
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
);
