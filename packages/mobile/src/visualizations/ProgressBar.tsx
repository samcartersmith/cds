import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, LayoutChangeEvent, View } from 'react-native';
import { ForwardedRef } from '@cbhq/cds-common';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { ProgressBaseProps } from '@cbhq/cds-common/types/ProgressBaseProps';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { usePalette } from '../hooks/usePalette';
import { Box, HStack, VStack } from '../layout';

export const ProgressBar = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        color = 'primary',
        disabled = false,
        disableAnimateOnMount = false,
        testID,
        accessibilityLabel = 'progress bar',
      }: ProgressBaseProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const height = useProgressSize(weight);
      const palette = usePalette();

      const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
        usePreviousValues<number>([disableAnimateOnMount ? progress : 0]);

      addPreviousPercent(progress);
      const previousPercent = getPreviousPercent() ?? 0;

      const animatedProgress = useRef(new Animated.Value(previousPercent));

      const [innerWidth, setInnerWidth] = useState<number>(-1);

      useEffect(() => {
        if (innerWidth > -1) {
          Animated.timing(
            animatedProgress.current,
            convertMotionConfig({
              toValue: progress,
              ...animateProgressBaseSpec,
              useNativeDriver: true,
            }),
          )?.start();
        }
      }, [progress, animatedProgress, innerWidth]);

      const handleLayout = useCallback((event: LayoutChangeEvent) => {
        setInnerWidth(event.nativeEvent.layout.width);
      }, []);

      const progressStyle = {
        opacity: innerWidth > -1 ? 1 : 0,
        transform: [
          {
            translateX: animatedProgress.current.interpolate({
              inputRange: [0, 1],
              outputRange: I18nManager.isRTL ? [innerWidth, 0] : [innerWidth * -1, 0],
            }),
          },
        ],
      };

      return (
        <VStack
          ref={forwardedRef}
          accessible
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="progressbar"
          accessibilityValue={{ text: `${progress * 100}%` }}
          flexGrow={1}
          flexShrink={0}
          testID={testID}
        >
          <HStack alignItems="center" justifyContent="center">
            <Box
              alignItems={I18nManager.isRTL ? 'flex-end' : 'flex-start'}
              borderRadius="rounded"
              dangerouslySetBackground={palette.line}
              flexGrow={1}
              flexShrink={1}
              height={height}
              justifyContent="center"
              onLayout={handleLayout}
              overflow="hidden"
              testID="cds-progress-bar-inner-bar-container"
            >
              <Box
                animated
                alignItems="flex-start"
                borderRadius="rounded"
                dangerouslySetBackground={!disabled ? palette[color] : palette.lineHeavy}
                flexGrow={0}
                flexShrink={0}
                height={height}
                justifyContent="center"
                style={progressStyle}
                testID="cds-progress-bar-inner-bar"
                width="100%"
              />
            </Box>
          </HStack>
        </VStack>
      );
    },
  ),
);
