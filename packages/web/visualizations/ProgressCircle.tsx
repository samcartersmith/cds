import React, { forwardRef, memo, useRef } from 'react';
import { m as motion } from 'framer-motion';
import { css } from 'linaria';
import { ForwardedRef } from '@cbhq/cds-common';
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

import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout';
import { useMotionProps } from '../motion/useMotionProps';

import { ProgressTextLabel } from './ProgressTextLabel';
import { VisualizationContainer } from './VisualizationContainer';

const svgClassName = css`
  display: block;
  max-width: 100%;
`;

const ProgressCircleText: React.FC<ProgressCircleTextBaseProps> = memo(({ progress, disabled }) => {
  return (
    <Box width="100%" height="100%" position="absolute" justifyContent="center" alignItems="center">
      <ProgressTextLabel
        value={Math.round(progress * 100)}
        disabled={disabled}
        color="foregroundMuted"
      />
    </Box>
  );
});

const ProgressCircleInner: React.FC<ProgressInnerCircleBaseProps> = memo(
  ({ size, progress, color, weight, visuallyDisabled }) => {
    const strokeWidth = useProgressSize(weight);
    const palette = usePalette();
    const circleRef = useRef<SVGCircleElement>(null);

    const circumference = getCircumference(getRadius(size, strokeWidth));

    const progressOffset = (1 - progress) * circumference;

    const motionProps = useMotionProps({
      style: {
        rotate: -90,
      },
      animate: {
        strokeDashoffset: progressOffset,
      },
      transition: animateProgressBaseSpec,
      initial: { strokeDashoffset: circumference },
    });

    return (
      <motion.circle
        data-testid="cds-progress-circle-inner"
        ref={circleRef}
        strokeDasharray={circumference}
        strokeLinecap="round"
        {...motionProps}
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
      forwardedRef: ForwardedRef<HTMLElement>,
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
              <Box
                flexGrow={0}
                flexShrink={0}
                width={circleSize}
                height={circleSize}
                position="relative"
              >
                <svg
                  key={circleSize}
                  className={svgClassName}
                  width={circleSize}
                  height={circleSize}
                >
                  <circle
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
                </svg>
                {!hideText && <ProgressCircleText progress={progress} disabled={disabled} />}
              </Box>
            </Box>
          )}
        </VisualizationContainer>
      );
    },
  ),
);
