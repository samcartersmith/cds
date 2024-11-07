import React, { forwardRef, memo, useMemo } from 'react';
import { Role, View } from 'react-native';
import { StickyFooterProps } from '@cbhq/cds-common';

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
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal,
        spacingStart,
        spacingTop,
        spacingVertical,
      }: StickyFooterProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const spacingProps = useMemo(
        () => ({
          spacing: spacing ?? 2,
          spacingBottom,
          spacingEnd,
          spacingHorizontal,
          spacingStart,
          spacingTop,
          spacingVertical,
        }),
        [
          spacing,
          spacingBottom,
          spacingEnd,
          spacingHorizontal,
          spacingStart,
          spacingTop,
          spacingVertical,
        ],
      );

      return (
        <Box
          ref={forwardedRef}
          accessibilityLabel={accessibilityLabel}
          borderColor="secondary"
          borderedTop={elevated}
          role={role as Role}
          testID={testID}
          {...spacingProps}
        >
          <View>{children}</View>
        </Box>
      );
    },
  ),
);
