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
        <Box ref={forwardedRef} testID={testID} {...props} overflow="hidden">
          <MotionBox
            testID="cds-tab-indicator-inner-bar-container"
            flexGrow={1}
            height={2}
            overflow="hidden"
            background="primary"
            animate={xMotionProps.animate}
            transition={xMotionProps.transition}
          >
            <MotionBox
              testID="cds-tab-indicator-inner-bar"
              height={2}
              width="100%"
              background={background}
              animate={widthMotionProps.animate}
              transition={widthMotionProps.transition}
            />
          </MotionBox>
        </Box>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
