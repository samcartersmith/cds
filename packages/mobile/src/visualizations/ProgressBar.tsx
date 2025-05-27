import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, LayoutChangeEvent, View } from 'react-native';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import type { SharedAccessibilityProps, SharedProps, Weight } from '@cbhq/cds-common/types';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { useTheme } from '../hooks/useTheme';
import { Box, HStack, VStack } from '../layout';
import type { HintMotionBaseProps } from '../motion/types';

export type ProgressBaseProps = SharedProps &
  Pick<HintMotionBaseProps, 'disableAnimateOnMount'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Number between 0-1 representing the progress percentage */
    progress: number;
    /** Toggle used to change thickness of progress visualization
     * @default normal
     * */
    weight?: Weight;
    /**
     * Toggle used to show a disabled progress visualization
     * @default false
     */
    disabled?: boolean;
    /**
     * Custom progress color.
     * @default primary
     */
    color?: ThemeVars.Color;
  };

export type ProgressBarProps = ProgressBaseProps;

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
      }: ProgressBarProps,
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
