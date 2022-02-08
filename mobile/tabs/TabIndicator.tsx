import { TabIndicatorProps, ForwardedRef } from '@cbhq/cds-common';
import React, { forwardRef, memo } from 'react';
import { Animated, View } from 'react-native';
import { Box } from '../layout';
import { useTabIndicatorStyles } from './hooks/useTabIndicatorStyles';

export const TabIndicator = memo(
  forwardRef(
    (
      { width, xPosition, testID, ...props }: TabIndicatorProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const { widthStyle, positionStyle } = useTabIndicatorStyles({ width, xPosition });

      return (
        <Animated.View testID={testID} ref={forwardedRef} style={positionStyle} {...props}>
          <Box
            testID="cds-tab-indicator-inner-bar-container"
            justifyContent="center"
            alignItems="flex-start"
            flexGrow={1}
            flexShrink={1}
            height={2}
            overflow="hidden"
            background="primary"
          >
            <Box
              testID="cds-tab-indicator-inner-bar"
              justifyContent="center"
              alignItems="flex-start"
              height={2}
              flexShrink={0}
              flexGrow={0}
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
