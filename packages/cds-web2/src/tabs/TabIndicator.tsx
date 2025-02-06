import React, { forwardRef, memo } from 'react';
import { m as motion } from 'framer-motion';
import { TabIndicatorProps } from '@cbhq/cds-common2/types';

import { Box } from '../layout/Box';

import { useAnimateTabIndicator } from './hooks/useAnimateTabIndicator';

const MotionBox = motion(Box);

export const TabIndicator = memo(
  forwardRef(
    (
      { width, x, background = 'bg', testID, ...props }: TabIndicatorProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const { widthMotionProps, xMotionProps } = useAnimateTabIndicator({ width, x });

      return (
        <Box ref={ref} testID={testID} {...props}>
          <MotionBox
            animate={xMotionProps.animate}
            background="bgPrimary"
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
