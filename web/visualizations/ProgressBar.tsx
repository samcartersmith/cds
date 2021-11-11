import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cx } from 'linaria';
import {
  ProgressBarBaseProps,
  InnerProgressBarBaseProps,
  ProgressLabelContainerBaseProps,
  ProgressBarFixedLabelBaseProps,
  ProgressTextLabelProps,
  ProgressBarFloatLabelBaseProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { useProgressBarHeight } from '@cbhq/cds-common/visualizations/useProgressBarHeight';
import { useProgressBarHasLabel } from '@cbhq/cds-common/visualizations/useProgressBarHasLabel';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { Palette } from '@cbhq/cds-common';
import { isRtl } from '../utils/isRtl';
import { usePalette } from '../hooks/usePalette';
import { TextLabel2 } from '../typography';
import * as progressBarStyles from './progressBarStyles';
import { Box, HStack, VStack } from '../layout';
import { Counter } from './Counter';
import { Animated } from '../animation/Animated';

function renderPercent(progress: number) {
  return `${progress}%`;
}

function renderDefaultLabel(num: number, textColor: string) {
  return (
    <TextLabel2 dangerouslySetColor={textColor} as="span" align="end">
      {renderPercent(num)}
    </TextLabel2>
  );
}

function generateRenderFloatLabel(palette: Palette) {
  return (num: number, disabled?: boolean) => {
    const textColor = disabled ? palette.lineHeavy : palette.foregroundMuted;
    return renderDefaultLabel(num, textColor);
  };
}

function generateRenderFixedLabel(palette: Palette) {
  return (num: number, disabled?: boolean) => {
    const textColor = disabled ? palette.lineHeavy : palette.foreground;
    return renderDefaultLabel(num, textColor);
  };
}

const ProgressTextLabel = memo(
  ({ startNum, endNum, renderLabel, disabled }: ProgressTextLabelProps) => {
    const palette = usePalette();
    const textColor = useMemo(
      () => (disabled ? palette.lineHeavy : palette.foregroundMuted),
      [disabled, palette.lineHeavy, palette.foregroundMuted],
    );

    const renderNum = useCallback(
      (num: number) => {
        const value = renderLabel(num, disabled);

        // if the user supplied value returns a string use default formatting
        if (typeof value === 'string') {
          return (
            <TextLabel2 dangerouslySetColor={textColor} as="span" align="end">
              {value}
            </TextLabel2>
          );
        }

        return value;
      },
      [disabled, textColor, renderLabel],
    );
    return (
      <Counter
        startNum={startNum}
        renderNum={renderNum}
        endNum={endNum}
        durationInMillis={durations.slow3}
      />
    );
  },
);

const InnerProgress: React.FC<InnerProgressBarBaseProps> = memo(
  ({ height, progress, barColor, startLabel, endLabel, disabled }: InnerProgressBarBaseProps) => {
    const palette = usePalette();
    const lastPercent = useRef<number>(0);
    const innerBarRef = useRef<HTMLElement>(null);

    const lastStartLabelNum = useRef<number>(0);
    const lastEndLabelNum = useRef<number>(0);

    let startLabelNum: number | null = null;
    let endLabelNum: number | null = null;

    let renderStartLabel = null;
    let renderEndLabel = null;

    if (startLabel) {
      ({ value: startLabelNum, render: renderStartLabel } = startLabel);
    }

    if (endLabel) {
      ({ value: endLabelNum, render: renderEndLabel } = endLabel);
    }

    useEffect(() => {
      if (startLabelNum !== null) {
        lastStartLabelNum.current = startLabelNum;
      }
    }, [startLabelNum]);

    useEffect(() => {
      if (endLabelNum !== null) {
        lastEndLabelNum.current = endLabelNum;
      }
    }, [endLabelNum]);

    useEffect(() => {
      if (innerBarRef.current) {
        innerBarRef.current.style.transformOrigin = isRtl() ? 'right' : 'left';

        Animated.timing(innerBarRef, {
          property: 'transform',
          fromValue: `scaleX(${lastPercent.current})`,
          toValue: `scaleX(${progress})`,
          easing: 'global',
          duration: 'slow3',
        })?.start();

        innerBarRef.current.style.width = '100%';
        innerBarRef.current.style.transform = `scaleX(${progress})`;
      }

      lastPercent.current = progress;
    }, [progress]);

    const startLabelEl = startLabelNum !== null && (
      <Box flexShrink={0} flexGrow={0} spacingEnd={1}>
        <ProgressTextLabel
          startNum={lastStartLabelNum.current}
          endNum={startLabelNum}
          renderLabel={renderStartLabel ?? generateRenderFixedLabel(palette)}
          disabled={disabled}
        />
      </Box>
    );

    const endLabelEl = endLabelNum !== null && (
      <Box flexShrink={0} flexGrow={0} spacingStart={1}>
        <ProgressTextLabel
          startNum={lastEndLabelNum.current}
          endNum={endLabelNum}
          renderLabel={renderEndLabel ?? generateRenderFixedLabel(palette)}
          disabled={disabled}
        />
      </Box>
    );

    return (
      <HStack spacingVertical={1} alignItems="center">
        {isRtl() ? endLabelEl : startLabelEl}
        <Box
          testID="cds-progress-bar-inner-bar-container"
          justifyContent={isRtl() ? 'flex-end' : 'flex-start'}
          alignItems="center"
          flexGrow={1}
          flexShrink={1}
          height={height}
          dangerouslySetBackground={palette.line}
          borderRadius="standard"
          overflow="hidden"
        >
          <Box
            ref={innerBarRef}
            testID="cds-progress-bar-inner-bar"
            alignItems="center"
            justifyContent="flex-start"
            height={height}
            flexShrink={0}
            flexGrow={0}
            width="0%"
            dangerouslySetBackground={!disabled ? palette[barColor] : palette.lineHeavy}
          />
        </Box>
        {isRtl() ? startLabelEl : endLabelEl}
      </HStack>
    );
  },
);

const ProgressLabelFloat: React.FC<ProgressBarFloatLabelBaseProps> = memo(
  ({ label, progress, disabled }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const lastPercent = useRef<number>(0);
    const lastLabelNum = useRef<number>(0);
    const [resizeNum, setResizeNum] = useState(0);
    const palette = usePalette();

    const { value: labelNum, render: renderLabel } = label;

    useEffect(() => {
      lastLabelNum.current = labelNum;
    }, [labelNum]);

    useEffect(() => {
      if (textContainerRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textContainerWidth = textContainerRef.current.offsetWidth;
        const startLeftTranslate = isRtl()
          ? Math.min(
              containerWidth - textContainerWidth,
              containerWidth - containerWidth * lastPercent.current,
            )
          : Math.max(0, containerWidth * lastPercent.current - textContainerWidth);
        const endLeftTranslate = isRtl()
          ? Math.min(
              containerWidth - textContainerWidth,
              containerWidth - containerWidth * progress,
            )
          : Math.max(0, containerWidth * progress - textContainerWidth);

        textContainerRef.current.style.transformOrigin = isRtl() ? 'left' : 'right';

        Animated.timing(textContainerRef, {
          property: 'transform',
          fromValue: `translateX(${startLeftTranslate}px)`,
          toValue: `translateX(${endLeftTranslate}px)`,
          easing: 'global',
          duration: 'slow3',
        })?.start();

        textContainerRef.current.style.transform = `translateX(${endLeftTranslate}px)`;
      }

      lastPercent.current = progress;
    }, [progress, resizeNum]);

    // the animation uses a pixel translate which is outdated on a window resize, we have to account for this
    useEffect(() => {
      function handleResize() {
        let timeoutId: ReturnType<typeof setTimeout>;
        return () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setResizeNum((oldResizeNum) => oldResizeNum + 1);
          }, 500);
        };
      }

      const handleResizeWithDebounce = handleResize();

      window.addEventListener('resize', handleResizeWithDebounce);

      return () => {
        window.removeEventListener('resize', handleResizeWithDebounce);
      };
    }, []);

    return (
      <Box ref={containerRef} flexWrap="nowrap">
        <Box
          flexGrow={0}
          flexShrink={0}
          testID="cds-progress-bar-float-label"
          ref={textContainerRef}
        >
          <ProgressTextLabel
            startNum={lastLabelNum.current}
            endNum={labelNum}
            renderLabel={renderLabel ?? generateRenderFloatLabel(palette)}
            disabled={disabled}
          />
        </Box>
      </Box>
    );
  },
);

// fixed left or right in a container
const ProgressLabelFixed: React.FC<ProgressBarFixedLabelBaseProps> = memo(
  ({ disabled, label, position }) => {
    const lastLabelNum = useRef<number>(0);
    const palette = usePalette();

    const { value: labelNum, render: renderLabel } = label;

    useEffect(() => {
      lastLabelNum.current = labelNum;
    }, [labelNum]);

    const style: React.CSSProperties = {};
    if (position === 'start') {
      if (isRtl()) {
        style.right = '0';
      } else {
        style.left = '0';
      }
    }
    if (position === 'end') {
      if (isRtl()) {
        style.left = '0';
      } else {
        style.right = '0';
      }
    }

    return (
      <span
        data-testid={`cds-progress-bar-fixed-label-${position}`}
        className={progressBarStyles.labelText}
        style={style}
      >
        <ProgressTextLabel
          startNum={lastLabelNum.current}
          endNum={labelNum}
          disabled={disabled}
          renderLabel={renderLabel ?? generateRenderFixedLabel(palette)}
        />
      </span>
    );
  },
);

const ProgressLabelContainer: React.FC<ProgressLabelContainerBaseProps> = memo(
  ({ progress, startLabel, endLabel, disabled }: ProgressLabelContainerBaseProps) => {
    const nodes: React.ReactElement[] = [];
    if (endLabel?.float) {
      nodes.push(
        <ProgressLabelFloat
          key="bar-label"
          label={endLabel}
          disabled={disabled}
          progress={progress}
        />,
      );
    } else {
      if (startLabel) {
        nodes.push(
          <ProgressLabelFixed
            key="start-label"
            disabled={disabled}
            position="start"
            label={startLabel}
          />,
        );
      }

      if (endLabel) {
        nodes.push(
          <ProgressLabelFixed
            key="end-label"
            disabled={disabled}
            position="end"
            label={endLabel} // ts doesn't understand Number.isFinite conditional
          />,
        );
      }
    }

    return (
      <div data-testid="label-container" className={cx(progressBarStyles.labelContainer)}>
        {nodes}
      </div>
    );
  },
);

export const ProgressBar: React.FC<ProgressBarBaseProps> = memo(
  ({
    weight = 'normal',
    progress,
    startLabel,
    endLabel,
    labelPlacement = 'above',
    barColor = 'primary',
    disabled = false,
    testID,
  }: ProgressBarBaseProps) => {
    const height = useProgressBarHeight(weight);
    const hasLabel = useProgressBarHasLabel({
      startLabel,
      endLabel,
      labelPlacement,
    });

    const progressLabelContainer = hasLabel && (
      <ProgressLabelContainer
        progress={progress}
        startLabel={startLabel}
        endLabel={endLabel}
        disabled={disabled}
      />
    );

    return (
      <VStack flexGrow={1} flexShrink={1} testID={testID}>
        {labelPlacement === 'above' && progressLabelContainer}

        <InnerProgress
          height={height}
          barColor={barColor}
          progress={progress}
          startLabel={labelPlacement === 'beside' ? startLabel : undefined}
          endLabel={labelPlacement === 'beside' ? endLabel : undefined}
          disabled={disabled}
        />

        {labelPlacement === 'below' && progressLabelContainer}
      </VStack>
    );
  },
);
