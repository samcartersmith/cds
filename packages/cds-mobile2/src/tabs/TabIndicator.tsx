import React, { forwardRef, memo } from 'react';
import { Animated, View } from 'react-native';
import { ForwardedRef, TabIndicatorProps } from '@cbhq/cds-common2';

import { Box } from '../layout';

import { useTabIndicatorStyles } from './hooks/useTabIndicatorStyles';

export const TabIndicator = memo(
  forwardRef(
    (
      { width, x, background = 'background', testID, ...props }: TabIndicatorProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const { widthStyle, xStyle } = useTabIndicatorStyles({ width, x });

      return (
        <Animated.View ref={forwardedRef} style={xStyle} testID={testID} {...props}>
          <Box
            background="backgroundPrimary"
            flexGrow={1}
            height={2}
            overflow="hidden"
            testID="cds-tab-indicator-inner-bar-container"
          >
            <Box
              animated
              background={background}
              height={2}
              style={widthStyle}
              testID="cds-tab-indicator-inner-bar"
              width="100%"
            />
          </Box>
        </Animated.View>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
