import React, { memo, useEffect, useState, useRef } from 'react';
import {
  ProgressCircleBaseProps,
  ProgressCircleTextBaseProps,
  ProgressInnerCircleBaseProps,
} from '@cbhq/cds-common/types/ProgressCircleBaseProps';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { VisualizationContainerDimension } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
import { getProgressCircleParams } from '@cbhq/cds-common/visualizations/getProgressCircleParams';
import { css } from 'linaria';
import { getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { Box } from '../layout';
import { usePalette } from '../hooks/usePalette';
import { convertMotionConfig } from '../animation/convertMotionConfig';
import { VisualizationContainer } from './VisualizationContainer';
import { ProgressTextLabel } from './ProgressTextLabel';

const svgClassName = css`
  display: block;
  max-width: 100%;
`;

const { easing, duration } = convertMotionConfig({
  toValue: 0,
  ...animateProgressBaseSpec,
});

const innerSvgCircleClassName = css`
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset ${duration}ms ${easing};
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
  ({ size, progress, color, weight, disabled }) => {
    const strokeWidth = useProgressSize(weight);
    const palette = usePalette();
    const circleRef = useRef<SVGCircleElement>(null);

    const circumference = getCircumference(getRadius(size, strokeWidth));

    const [offset, setOffset] = useState(circumference);
    useEffect(() => {
      const progressOffset = (1 - progress) * circumference;

      // If you have multiple circle progresses then this is required to animate them in parallel.
      // The browser can struggle to perform css transitions in parallel, this should be rare
      requestAnimationFrame(() => {
        setOffset(progressOffset);
      });
    }, [setOffset, circumference, progress]);

    return (
      <circle
        data-testid="cds-progress-circle-inner"
        ref={circleRef}
        className={innerSvgCircleClassName}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
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
            <Box
              flexGrow={0}
              flexShrink={0}
              width={circleSize}
              height={circleSize}
              position="relative"
            >
              <svg key={circleSize} className={svgClassName} width={circleSize} height={circleSize}>
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
                  disabled={disabled}
                />
              </svg>
              {!hideText && <ProgressCircleText progress={progress} disabled={disabled} />}
            </Box>
          </Box>
        )}
      </VisualizationContainer>
    );
  },
);
