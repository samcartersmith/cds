import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, LayoutChangeEvent, View } from 'react-native';
import { animateProgressBaseSpec } from '@cbhq/cds-common2/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common2/hooks/usePreviousValues';
import { ProgressBaseProps } from '@cbhq/cds-common2/types/ProgressBaseProps';
import { useProgressSize } from '@cbhq/cds-common2/visualizations/useProgressSize';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, HStack, VStack } from '../layout';

export const ProgressBar = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        color = 'bgPrimary',
        disabled = false,
        disableAnimateOnMount = false,
        testID,
        accessibilityLabel,
      }: ProgressBaseProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const theme = useTheme();
      const height = useProgressSize(weight);

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
          accessibilityValue={{ min: 0, max: 100, now: progress * 100 }}
          flexGrow={1}
          flexShrink={0}
          testID={testID}
        >
          <HStack alignItems="center" justifyContent="center">
            <Box
              alignItems={I18nManager.isRTL ? 'flex-end' : 'flex-start'}
              borderRadius={200}
              dangerouslySetBackground={theme.color.bgLine}
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
                borderRadius={200}
                dangerouslySetBackground={!disabled ? theme.color[color] : theme.color.bgLineHeavy}
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
