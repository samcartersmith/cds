import React, { forwardRef, memo, useEffect, useRef } from 'react';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';
import { ProgressBaseProps } from '@cbhq/cds-common/types/ProgressBaseProps';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { ForwardedRef } from '@cbhq/cds-common';
import { isRtl } from '../utils/isRtl';
import { usePalette } from '../hooks/usePalette';
import { Box, HStack, VStack } from '../layout';
import { Animated } from '../animation/Animated';

export const ProgressBar = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        color = 'primary',
        disabled = false,
        testID,
      }: ProgressBaseProps,
      forwardedRef: ForwardedRef<HTMLElement>,
    ) => {
      const height = useProgressSize(weight);

      const palette = usePalette();
      const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
        usePreviousValues<number>([0]);

      addPreviousPercent(progress);
      const previousPercent = getPreviousPercent() ?? 0;

      const innerBarRef = useRef<HTMLElement>(null);

      useEffect(() => {
        if (innerBarRef.current) {
          innerBarRef.current.style.transformOrigin = isRtl() ? 'right' : 'left';

          const translateXStart = isRtl()
            ? 100 - previousPercent * 100
            : -100 + previousPercent * 100;

          const translateXEnd = isRtl() ? 100 - progress * 100 : -100 + progress * 100;
          Animated.timing(innerBarRef, {
            property: 'transform',
            fromValue: `translateX(${translateXStart}%)`,
            toValue: `translateX(${translateXEnd}%)`,
            ...animateProgressBaseSpec,
          })?.start();

          innerBarRef.current.style.transform = `translateX(${translateXEnd}%)`;
          innerBarRef.current.style.opacity = '1';
        }
      }, [previousPercent, progress]);

      return (
        <VStack flexGrow={1} flexShrink={0} testID={testID} ref={forwardedRef}>
          <HStack alignItems="center">
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
                width="100%"
                opacity={0}
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
