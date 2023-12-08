import React, { ForwardedRef, forwardRef, memo, useMemo } from 'react';
import { Role, View } from 'react-native';
import { StickyFooterProps, useSpectrum } from '@cbhq/cds-common';

import { usePalette } from '../hooks/usePalette';
import { useSafeBottomPadding } from '../hooks/useSafeBottomPadding';
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
      forwardedRef: ForwardedRef<View>,
    ) => {
      const theme = useSpectrum();
      const palette = usePalette();
      const safeBottomPadding = useSafeBottomPadding();

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
          background={theme === 'light' ? 'background' : 'backgroundAlternate'}
          dangerouslySetStyle={{
            borderColor: palette.backgroundAlternate,
          }}
          elevation={elevated ? 2 : 0}
          role={role as Role}
          testID={testID}
          {...spacingProps}
        >
          <View
            style={{
              paddingBottom: safeBottomPadding / 2,
            }}
          >
            {children}
          </View>
        </Box>
      );
    },
  ),
);
