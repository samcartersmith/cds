import React, { memo } from 'react';
import { Animated } from 'react-native';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common/overlays/OverlayContentContext';
import { overlayPalette } from '@cbhq/cds-common/palette/constants';

import { VStack, VStackProps } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';

const overlayContentContextValue: OverlayContentContextValue = {
  isOverlay: true,
};

export type OverlayProps = {
  /** Opacity of overlay. Pass in the animated value from useOverlayAnimation to use CDS approved animation curves and timings. */
  opacity: Animated.Value;
} & Omit<VStackProps, 'opacity'>;

export const Overlay = memo(function Overlay({ opacity, ...props }: OverlayProps) {
  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <ThemeProvider name="overlay" palette={overlayPalette}>
        <VStack
          animated
          renderToHardwareTextureAndroid
          background="backgroundOverlay"
          opacity={opacity}
          pin="all"
          {...props}
        />
      </ThemeProvider>
    </OverlayContentContext.Provider>
  );
});

Overlay.displayName = 'Overlay';
