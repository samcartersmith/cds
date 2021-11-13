import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  Animated,
  LayoutChangeEvent,
  I18nManager,
} from 'react-native';
import {
  InnerProgressBarBaseProps,
  ProgressBarBaseProps,
  ProgressBarFixedLabelBaseProps,
  ProgressBarFloatLabelBaseProps,
  ProgressLabelContainerBaseProps,
  ProgressTextLabelProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';
import { useProgressBarHasLabel } from '@cbhq/cds-common/visualizations/useProgressBarHasLabel';
import { Palette } from '@cbhq/cds-common';
import { durations } from '@cbhq/cds-common/tokens/motion';
import { convertMotionConfig } from '../animation/convertMotionConfig';
import { Box, HStack, VStack } from '../layout';
import { TextLabel2 } from '../typography';
import { usePalette } from '../hooks/usePalette';
import { Counter } from './Counter';

function addToLabelNumRefArray(numArray: number[], num: number | null) {
  if (Number.isFinite(num)) {
    if (numArray.length === 0 || numArray[numArray.length - 1] !== num) {
      numArray.push(num as number);
    }
  }
}

function getLastLabelNum(numArray: number[], num: number) {
  return numArray.length > 1 ? numArray[numArray.length - 2] : num;
}

function renderPercent(percent: number) {
  return `${percent}%`;
}

function renderDefaultLabel(num: number, textColor: string) {
  return (
    <TextLabel2 dangerouslySetColor={textColor} align="end">
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
            <TextLabel2 dangerouslySetColor={textColor} align="end">
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
  ({ height, progress, color, startLabel, endLabel, disabled }: InnerProgressBarBaseProps) => {
    const palette = usePalette();
    const lastPercent = useRef<number[]>([0]);
    const animatedProgress = useRef(
      new Animated.Value(lastPercent.current[lastPercent.current.length - 1]),
    );

    const lastStartLabelNum = useRef<number[]>([0]);
    const lastEndLabelNum = useRef<number[]>([0]);

    const [innerWidth, setInnerWidth] = useState<number>(-1);

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

    addToLabelNumRefArray(lastStartLabelNum.current, startLabelNum);
    addToLabelNumRefArray(lastEndLabelNum.current, endLabelNum);

    useEffect(() => {
      if (innerWidth > -1) {
        Animated.timing(
          animatedProgress.current,
          convertMotionConfig({
            toValue: progress,
            easing: 'global',
            duration: 'slow3',
            useNativeDriver: true,
          }),
        )?.start();
      }
    }, [progress, animatedProgress, innerWidth]);

    addToLabelNumRefArray(lastPercent.current, progress);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      setInnerWidth(event.nativeEvent.layout.width);
    }, []);

    const progressStyle = {
      transform: [
        {
          translateX: animatedProgress.current.interpolate({
            inputRange: [0, 1],
            outputRange: [innerWidth / (I18nManager.isRTL ? 2 : -2), 0],
          }),
        },
        {
          scaleX: animatedProgress.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0.0001, 1],
          }),
        },
      ],
    };

    const startLabelEl = startLabelNum !== null && (
      <Box flexShrink={0} flexGrow={0} spacingEnd={1}>
        <ProgressTextLabel
          startNum={getLastLabelNum(lastStartLabelNum.current, startLabelNum)}
          endNum={startLabelNum}
          renderLabel={renderStartLabel ?? generateRenderFixedLabel(palette)}
          disabled={disabled}
        />
      </Box>
    );

    const endLabelEl = endLabelNum !== null && (
      <Box flexShrink={0} flexGrow={0} spacingStart={1}>
        <ProgressTextLabel
          startNum={getLastLabelNum(lastEndLabelNum.current, endLabelNum)}
          endNum={endLabelNum}
          renderLabel={renderEndLabel ?? generateRenderFixedLabel(palette)}
          disabled={disabled}
        />
      </Box>
    );

    return (
      <HStack spacingVertical={1} justifyContent="center" alignItems="center">
        {I18nManager.isRTL ? endLabelEl : startLabelEl}
        <Box
          onLayout={handleLayout}
          testID="cds-progress-bar-inner-bar-container"
          justifyContent="center"
          alignItems={I18nManager.isRTL ? 'flex-end' : 'flex-start'}
          flexGrow={1}
          flexShrink={1}
          height={height}
          dangerouslySetBackground={palette.line}
          borderRadius="standard"
          overflow="hidden"
        >
          <Box
            testID="cds-progress-bar-inner-bar"
            justifyContent="center"
            alignItems="flex-start"
            height={height}
            flexShrink={0}
            flexGrow={0}
            width="100%"
            animated
            dangerouslySetStyle={progressStyle}
            dangerouslySetBackground={!disabled ? palette[color] : palette.lineHeavy}
          />
        </Box>
        {I18nManager.isRTL ? startLabelEl : endLabelEl}
      </HStack>
    );
  },
);

// floats at the end of the bar
const ProgressLabelFloat: React.FC<ProgressBarFloatLabelBaseProps> = memo(
  ({ label, progress, disabled }) => {
    const lastLabelNum = useRef<number[]>([0]);
    const [containerWidth, setContainerWidth] = useState<number>(-1);
    const [textWidth, setTextWidth] = useState<number>(-1);
    const lastPercent = useRef<number[]>([0]);
    const palette = usePalette();
    const animatedProgress = useRef(
      new Animated.Value(lastPercent.current[lastPercent.current.length - 1]),
    );

    const { value: labelNum, render: renderLabel } = label;

    useEffect(() => {
      if (containerWidth > -1 && textWidth > -1) {
        Animated.timing(
          animatedProgress.current,
          convertMotionConfig({
            toValue: progress,
            easing: 'global',
            duration: 'slow3',
            useNativeDriver: true,
          }),
        )?.start();
      }
    }, [progress, animatedProgress, containerWidth, textWidth]);

    addToLabelNumRefArray(lastPercent.current, progress);
    addToLabelNumRefArray(lastLabelNum.current, labelNum);

    const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
      setContainerWidth(event.nativeEvent.layout.width);
    }, []);

    const handleTextLayout = useCallback((event: LayoutChangeEvent) => {
      setTextWidth(event.nativeEvent.layout.width);
    }, []);

    const progressStyle = {
      transform: [
        {
          translateX: animatedProgress.current.interpolate({
            inputRange: [0, 1],
            outputRange: [
              I18nManager.isRTL ? containerWidth - textWidth : 0,
              I18nManager.isRTL ? 0 : containerWidth - textWidth,
            ],
          }),
        },
      ],
    };

    return (
      <Box
        onLayout={handleContainerLayout}
        testID="cds-progress-bar-float-label-container"
        flexWrap="nowrap"
      >
        <Box
          flexGrow={0}
          flexShrink={0}
          testID="cds-progress-bar-float-label"
          onLayout={handleTextLayout}
          animated
          dangerouslySetStyle={progressStyle}
          alignSelf="flex-start"
        >
          <ProgressTextLabel
            startNum={getLastLabelNum(lastLabelNum.current, labelNum)}
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

    const style: ViewStyle = {};
    if (position === 'start') {
      if (I18nManager.isRTL) {
        style.right = 0;
      } else {
        style.left = 0;
      }
    }
    if (position === 'end') {
      if (I18nManager.isRTL) {
        style.left = 0;
      } else {
        style.right = 0;
      }
    }

    return (
      <View
        testID={`cds-progress-bar-fixed-label-${position}`}
        style={[styles.labelTextStyle, style]}
      >
        <ProgressTextLabel
          startNum={lastLabelNum.current}
          endNum={labelNum}
          disabled={disabled}
          renderLabel={renderLabel ?? generateRenderFixedLabel(palette)}
        />
      </View>
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
      <View testID="label-container" style={styles.progressLabelContainer}>
        {nodes}
      </View>
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
    color = 'primary',
    disabled = false,
    testID,
  }: ProgressBarBaseProps) => {
    const height = useProgressSize(weight);
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
          color={color}
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

const styles = StyleSheet.create({
  progressLabelContainer: {
    position: 'relative',
    height: 20,
  },
  labelTextStyle: {
    position: 'absolute',
  },
});
