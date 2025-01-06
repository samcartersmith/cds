import React, { forwardRef, memo } from 'react';
import { Role, View } from 'react-native';
import { StickyFooterProps } from '@cbhq/cds-common2';

import { Box } from '../layout';

export const StickyFooter = memo(
  forwardRef(
    (
      {
        elevated,
        children,
        testID = 'sticky-footer',
        role = 'toolbar',
        accessibilityLabel = 'footer',
        padding = 2,
        ...props
      }: StickyFooterProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      return (
        <Box
          ref={forwardedRef}
          accessibilityLabel={accessibilityLabel}
          borderColor="backgroundSecondary"
          borderedTop={elevated}
          padding={padding}
          role={role as Role}
          testID={testID}
          {...props}
        >
          <View>{children}</View>
        </Box>
      );
    },
  ),
);
