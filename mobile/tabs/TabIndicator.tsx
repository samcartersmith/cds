import { TabIndicatorProps, ForwardedRef } from '@cbhq/cds-common';
import React, { forwardRef, memo } from 'react';
import { Animated, View } from 'react-native';
import { Box } from '../layout';
import { useTabIndicatorStyles } from './hooks/useTabIndicatorStyles';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabIndicator = memo(
  forwardRef(
    ({ width, x, testID, ...props }: TabIndicatorProps, forwardedRef: ForwardedRef<View>) => {
      const { widthStyle, xStyle } = useTabIndicatorStyles({ width, x });

      return (
        <Animated.View testID={testID} ref={forwardedRef} style={xStyle} {...props}>
          <Box
            testID="cds-tab-indicator-inner-bar-container"
            flexGrow={1}
            height={2}
            overflow="hidden"
            background="primary"
          >
            <Box
              testID="cds-tab-indicator-inner-bar"
              height={2}
              width="100%"
              animated
              dangerouslySetStyle={widthStyle}
              background="background"
            />
          </Box>
        </Animated.View>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
