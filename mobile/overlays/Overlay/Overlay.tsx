import React, { memo } from 'react';

import { OverlayProvider } from '@cbhq/cds-common/context/OverlayProvider';
import { Animated } from 'react-native';

import { VStack, VStackProps } from '../../layout/VStack';

export type OverlayProps = {
  /** Opacity of overlay. Pass in the animated value from useOverlayAnimation to use CDS approved animation curves and timings. */
  opacity: Animated.Value;
} & Omit<VStackProps, 'opacity'>;

export const Overlay = memo(({ opacity, ...props }: OverlayProps) => {
  return (
    <OverlayProvider>
      <VStack
        animated
        background="backgroundOverlay"
        opacity={opacity}
        pin="all"
        renderToHardwareTextureAndroid
        {...props}
      />
    </OverlayProvider>
  );
});

Overlay.displayName = 'Overlay';
