import React, { forwardRef, memo } from 'react';
import { m } from 'framer-motion';
import { Box } from '@cbhq/cds-web2/layout';
import { TabsActiveIndicatorProps } from '@cbhq/cds-web2/tabs/Tabs';

import { useAnimateTabIndicator } from './useAnimateTabIndicator';

const MotionBox = m(Box);

export const TabIndicator = memo(
  forwardRef(
    (
      { activeTabRect: { x, width }, ...props }: TabsActiveIndicatorProps,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const { motionProps } = useAnimateTabIndicator({ width, x });

      return (
        <Box ref={forwardedRef} bottom={0} position="absolute" {...props}>
          <MotionBox
            animate={motionProps.animate}
            background="linePrimary"
            height={2}
            initial={false}
            overflow="hidden"
            testID="cds-tab-indicator-inner-bar-container"
            transition={motionProps.transition}
            width={width}
          />
        </Box>
      );
    },
  ),
);
