import React, { forwardRef, memo, useRef } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { getProgressCircleParams } from '@cbhq/cds-common/visualizations/getProgressCircleParams';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';

import { Box } from '../layout/Box';
import { useMotionProps } from '../motion/useMotionProps';

import type { ProgressBaseProps } from './ProgressBar';
import { ProgressTextLabel } from './ProgressTextLabel';
import {
  VisualizationContainer,
  type VisualizationContainerDimension,
} from './VisualizationContainer';

export type ProgressCircleBaseProps = ProgressBaseProps & {
  /** Toggle used to hide the inner circle percentage */
  hideText?: boolean;
  /** Optional size in px for the visualization. This is useful if the visualization is used in an HStack. If this is omitted the visualization will fill the parent width or height. Since it's a circular visualization it will fill the smaller of the parent width or height. */
  size?: number;
};

export type ProgressCircleTextBaseProps = Pick<ProgressCircleBaseProps, 'progress' | 'disabled'>;

export type ProgressInnerCircleBaseProps = Pick<ProgressCircleBaseProps, 'progress'> &
  Required<Pick<ProgressCircleBaseProps, 'size' | 'weight' | 'color'>> & {
    visuallyDisabled?: boolean;
  };

const svgClassName = css`
  display: block;
  max-width: 100%;
`;

const ProgressCircleText = memo(({ progress, disabled }: ProgressCircleTextBaseProps) => {
  return (
    <Box alignItems="center" height="100%" justifyContent="center" position="absolute" width="100%">
      <ProgressTextLabel color="fgMuted" disabled={disabled} value={Math.round(progress * 100)} />
    </Box>
  );
});

const ProgressCircleInner = memo(
  ({ size, progress, color, weight, visuallyDisabled }: ProgressInnerCircleBaseProps) => {
    const strokeWidth = useProgressSize(weight);
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
          stroke: !visuallyDisabled ? `var(--color-${color})` : 'var(--color-bgLineHeavy)',
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
        color = 'bgPrimary',
        disabled = false,
        testID,
        hideText,
        size,
        accessibilityLabel,
      }: ProgressCircleBaseProps,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const strokeWidth = useProgressSize(weight);

      const visSize = size ?? '100%';
      return (
        <VisualizationContainer height={visSize} width={visSize}>
          {({ width, height, circleSize }: VisualizationContainerDimension) => (
            <Box
              ref={forwardedRef}
              accessibilityLabel={accessibilityLabel}
              alignItems="center"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Math.round(progress * 100)}
              height={height}
              justifyContent="center"
              role="progressbar"
              testID={testID}
              title={accessibilityLabel}
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
                  aria-hidden
                  className={svgClassName}
                  height={circleSize}
                  width={circleSize}
                >
                  <circle
                    {...getProgressCircleParams({
                      size: circleSize,
                      strokeWidth,
                      stroke: 'var(--color-bgLine)',
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
