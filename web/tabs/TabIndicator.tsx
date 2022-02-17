import { TabIndicatorProps, ForwardedRef } from '@cbhq/cds-common';
import React, { forwardRef, memo, useRef } from 'react';
import { useAnimateTabIndicator } from './hooks/useAnimateTabIndicator';
import { Box } from '../layout';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabIndicator = memo(
  forwardRef(
    (
      { width, x, testID, ...props }: TabIndicatorProps,
      forwardedRef: ForwardedRef<HTMLElement>,
    ) => {
      const xRef = useRef<HTMLElement>(null);
      const widthRef = useRef<HTMLElement>(null);
      useAnimateTabIndicator({ width, x, xRef, widthRef });

      return (
        <Box ref={forwardedRef} testID={testID} {...props} overflow="hidden">
          <Box
            ref={xRef}
            testID="cds-tab-indicator-inner-bar-container"
            flexGrow={1}
            height={2}
            overflow="hidden"
            background="primary"
          >
            <Box
              ref={widthRef}
              testID="cds-tab-indicator-inner-bar"
              height={2}
              width="100%"
              background="background"
            />
          </Box>
        </Box>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
