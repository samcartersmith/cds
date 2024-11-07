import React, { forwardRef, memo } from 'react';
import { m as motion } from 'framer-motion';
import { ForwardedRef, TabIndicatorProps } from '@cbhq/cds-common';

import { Box } from '../layout';

import { useAnimateTabIndicator } from './hooks/useAnimateTabIndicator';

const MotionBox = motion(Box);

export const TabIndicator = memo(
  forwardRef(
    (
      { width, x, background = 'background', testID, ...props }: TabIndicatorProps,
      forwardedRef: ForwardedRef<HTMLElement>,
    ) => {
      const { widthMotionProps, xMotionProps } = useAnimateTabIndicator({ width, x });

      return (
        <Box ref={forwardedRef} testID={testID} {...props}>
          <MotionBox
            animate={xMotionProps.animate}
            background="primary"
            height={2}
            initial={false}
            overflow="hidden"
            testID="cds-tab-indicator-inner-bar-container"
            transition={xMotionProps.transition}
            width={width}
          >
            <MotionBox
              animate={widthMotionProps.animate}
              background={background}
              height={2}
              initial={false}
              testID="cds-tab-indicator-inner-bar"
              transition={widthMotionProps.transition}
              width="100%"
            />
          </MotionBox>
        </Box>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
