import React, { forwardRef, memo } from 'react';
import { m as motion } from 'framer-motion';
import { css } from 'linaria';
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

const boxClassName = css`
  contain: content;
`;

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
      forwardedRef: ForwardedRef<HTMLElement>,
    ) => {
      const height = useProgressSize(weight);

      const palette = usePalette();
      const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
        usePreviousValues<number>([disableAnimateOnMount ? progress : 0]);

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
        initial: !progress ? false : { x: `${translateXStart}%` }, // skip initial animation if no progress
      });

      return (
        <VStack
          ref={forwardedRef}
          accessibilityLabel={accessibilityLabel}
          aria-valuenow={progress * 100}
          flexGrow={1}
          flexShrink={0}
          role="progressbar"
          testID={testID}
        >
          <HStack alignItems="center">
            <Box
              alignItems="center"
              borderRadius="rounded"
              className={boxClassName}
              dangerouslySetBackground={palette.line}
              flexGrow={1}
              flexShrink={1}
              height={height}
              justifyContent={isRtl() ? 'flex-end' : 'flex-start'}
              overflow="hidden"
              testID="cds-progress-bar-inner-bar-container"
            >
              <MotionBox
                alignItems="center"
                animate={motionProps.animate}
                borderRadius="rounded"
                dangerouslySetBackground={!disabled ? palette[color] : palette.lineHeavy}
                flexGrow={0}
                flexShrink={0}
                height={height}
                initial={motionProps.initial}
                justifyContent="flex-start"
                opacity={disableAnimateOnMount ? 1 : 0}
                style={motionProps.style}
                testID="cds-progress-bar-inner-bar"
                transition={motionProps.transition}
                width="100%"
              />
            </Box>
          </HStack>
        </VStack>
      );
    },
  ),
);
