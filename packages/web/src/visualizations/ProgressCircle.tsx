import React, { forwardRef, memo, useRef } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';
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

const ProgressCircleText = memo(({ progress, disabled }: ProgressCircleTextBaseProps) => {
  return (
    <Box alignItems="center" height="100%" justifyContent="center" position="absolute" width="100%">
      <ProgressTextLabel
        color="foregroundMuted"
        disabled={disabled}
        value={Math.round(progress * 100)}
      />
    </Box>
  );
});

const ProgressCircleInner = memo(
  ({ size, progress, color, weight, visuallyDisabled }: ProgressInnerCircleBaseProps) => {
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
        ref={circleRef}
        data-testid="cds-progress-circle-inner"
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
        <VisualizationContainer height={visSize} width={visSize}>
          {({ width, height, circleSize }: VisualizationContainerDimension) => (
            <Box
              ref={forwardedRef}
              alignItems="center"
              height={height}
              justifyContent="center"
              testID={testID}
              width={width}
            >
              <Box
                flexGrow={0}
                flexShrink={0}
                height={circleSize}
                position="relative"
                width={circleSize}
              >
                <svg
                  key={circleSize}
                  className={svgClassName}
                  height={circleSize}
                  width={circleSize}
                >
                  <circle
                    {...getProgressCircleParams({
                      size: circleSize,
                      strokeWidth,
                      stroke: palette.line,
                    })}
                  />
                  <ProgressCircleInner
                    color={color}
                    progress={progress}
                    size={circleSize}
                    visuallyDisabled={disabled}
                    weight={weight}
                  />
                </svg>
                {!hideText && <ProgressCircleText disabled={disabled} progress={progress} />}
              </Box>
            </Box>
          )}
        </VisualizationContainer>
      );
    },
  ),
);
