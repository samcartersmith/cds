import React, { forwardRef, memo } from 'react';
import { m as motion } from 'framer-motion';
import { ForwardedRef } from '@cbhq/cds-common';
import { animateProgressBaseSpec } from '@cbhq/cds-common/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { ProgressBaseProps } from '@cbhq/cds-common/types/ProgressBaseProps';
import { useProgressSize } from '@cbhq/cds-common/visualizations/useProgressSize';

import { usePalette } from '../hooks/usePalette';
import { Box, HStack, VStack } from '../layout';
import { useMotionProps } from '../motion/useMotionProps';
import { isRtl } from '../utils/isRtl';

const MotionBox = motion(Box);

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
      const translateXStart = isRtl() ? 100 - previousPercent * 100 : -100 + previousPercent * 100;
      const translateXEnd = isRtl() ? 100 - progress * 100 : -100 + progress * 100;

      const motionProps = useMotionProps({
        style: {
          originX: isRtl() ? 'right' : 'left',
        },
        animate: {
          x: [`${translateXStart}%`, `${translateXEnd}%`],
          opacity: 1,
        },
        transition: animateProgressBaseSpec,
      });

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
              <MotionBox
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
                animate={motionProps.animate}
                transition={motionProps.transition}
                style={motionProps.style}
              />
            </Box>
          </HStack>
        </VStack>
      );
    },
  ),
);
