import React, { memo } from 'react';
import { Animated } from 'react-native';
import { overlayPalette } from '@cbhq/cds-common/palette/constants';

import { VStack, VStackProps } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';

export type OverlayProps = {
  /** Opacity of overlay. Pass in the animated value from useOverlayAnimation to use CDS approved animation curves and timings. */
  opacity: Animated.Value;
} & Omit<VStackProps, 'opacity'>;

export const Overlay = memo(function Overlay({ opacity, ...props }: OverlayProps) {
  return (
    <ThemeProvider name="overlay" palette={overlayPalette}>
      <VStack
        animated
        opacity={opacity}
        pin="all"
        renderToHardwareTextureAndroid
        background="backgroundOverlay"
        {...props}
      />
    </ThemeProvider>
  );
});

Overlay.displayName = 'Overlay';
