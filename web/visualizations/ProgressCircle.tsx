import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import {
  ProgressCircleBaseProps,
  ProgressCircleTextBaseProps,
  ProgressInnerCircleBaseProps,
} from '@cbhq/cds-common/types/ProgressCircleBaseProps';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { css, cx } from 'linaria';
import { getCenter, getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { Counter } from './Counter';
import { Box } from '../layout';
import { TextLabel2 } from '../typography';
import { usePalette } from '../hooks/usePalette';
import { convertMotionConfig } from '../animation/convertMotionConfig';
import { VisualizationContainer, Dimension } from './VisualizationContainer';

const svgClassName = css`
  display: block;
  max-width: 100%;
`;

const svgCircleClassName = css`
  fill: none;
`;

const { easing, duration } = convertMotionConfig({
  toValue: 0,
  duration: 'slow3',
  easing: 'global',
});

const innerSvgCircleClassName = css`
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset ${duration}ms ${easing};
`;

const ProgressCircleText: React.FC<ProgressCircleTextBaseProps> = memo(({ progress, disabled }) => {
  const lastLabelNum = useRef<number>(0);
  const palette = usePalette();

  const renderNum = useCallback(
    (num: number) => {
      return (
        <TextLabel2
          disabled={disabled}
          dangerouslySetColor={palette.foregroundMuted}
          as="span"
          align="end"
        >
          {num}%
        </TextLabel2>
      );
    },
    [disabled, palette.foregroundMuted],
  );

  useEffect(() => {
    lastLabelNum.current = progress;
  }, [progress]);

  return (
    <Box width="100%" height="100%" position="absolute" justifyContent="center" alignItems="center">
      <Counter
        startNum={Math.round(lastLabelNum.current * 100)}
        renderNum={renderNum}
        endNum={Math.round(progress * 100)}
        durationInMillis={durations.slow3}
      />
    </Box>
  );
});

const ProgressInnerCircle: React.FC<ProgressInnerCircleBaseProps> = memo(
  ({ size, progress, color, weight, disabled }) => {
    const strokeWidth = useProgressSize(weight);
    const palette = usePalette();
    const circleRef = useRef<SVGCircleElement>(null);

    const radius = getRadius(size, strokeWidth);
    const circumference = getCircumference(radius);
    const center = getCenter(size);

    const [offset, setOffset] = useState(circumference);
    useEffect(() => {
      const progressOffset = (1 - progress) * circumference;
      setOffset(progressOffset);
    }, [setOffset, circumference, progress, offset]);

    return (
      <circle
        ref={circleRef}
        className={cx(svgCircleClassName, innerSvgCircleClassName)}
        stroke={!disabled ? palette[color] : palette.lineHeavy}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
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
        {({ width, height, circleSize }: Dimension) => (
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
                  className={svgCircleClassName}
                  stroke={palette.line}
                  cx={getCenter(circleSize)}
                  cy={getCenter(circleSize)}
                  r={getRadius(circleSize, strokeWidth)}
                  strokeWidth={strokeWidth}
                />
                <ProgressInnerCircle
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
