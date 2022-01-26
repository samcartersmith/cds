import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, I18nManager, LayoutChangeEvent, View } from 'react-native';
import { ForwardedRef } from '@cbhq/cds-common';
import { animateProgressBaseSpec } from '@cbhq/cds-common/src/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common/src/hooks/usePreviousValues';
import { ProgressBaseProps } from '@cbhq/cds-common/src/types/ProgressBaseProps';
import { useProgressSize } from '@cbhq/cds-common/src/visualizations/useProgressSize';

import { convertMotionConfig } from '../animation/convertMotionConfig';
import { usePalette } from '../hooks/usePalette';
import { Box, HStack, VStack } from '../layout';

export const ProgressBar: React.FC<ProgressBaseProps> = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        color = 'primary',
        disabled = false,
        testID,
      }: ProgressBaseProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const height = useProgressSize(weight);
      const palette = usePalette();

      const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
        usePreviousValues<number>([0]);

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
        <VStack flexGrow={1} flexShrink={0} testID={testID} ref={forwardedRef}>
          <HStack justifyContent="center" alignItems="center">
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
                borderRadius="standard"
                dangerouslySetBackground={!disabled ? palette[color] : palette.lineHeavy}
              />
            </Box>
          </HStack>
        </VStack>
      );
    },
  ),
);
