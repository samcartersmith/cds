import React, { forwardRef, memo, useRef } from 'react';
import { ForwardedRef, TabIndicatorProps } from '@cbhq/cds-common';

import { Box } from '../layout';

import { useAnimateTabIndicator } from './hooks/useAnimateTabIndicator';

export const TabIndicator = memo(
  forwardRef(
    (
      { width, x, background = 'background', testID, ...props }: TabIndicatorProps,
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
              background={background}
            />
          </Box>
        </Box>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
