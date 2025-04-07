import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';
import { animateProgressBaseSpec } from '@cbhq/cds-common2/animation/progress';
import { usePreviousValues } from '@cbhq/cds-common2/hooks/usePreviousValues';
import { ProgressBaseProps } from '@cbhq/cds-common2/types/ProgressBaseProps';
import { useProgressSize } from '@cbhq/cds-common2/visualizations/useProgressSize';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { useMotionProps } from '../motion/useMotionProps';
import { isRtl } from '../utils/isRtl';

const MotionBox = motion(Box);

const boxStyles = css`
  contain: content;
`;

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
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const height = useProgressSize(weight);

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
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress * 100}
          flexGrow={1}
          flexShrink={0}
          role="progressbar"
          testID={testID}
        >
          <HStack alignItems="center">
            <Box
              alignItems="center"
              background="bgLine"
              borderRadius={200}
              className={boxStyles}
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
                background={disabled ? 'bgLineHeavy' : color}
                borderRadius="rounded"
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
