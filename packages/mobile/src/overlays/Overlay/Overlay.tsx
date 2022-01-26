import React, { memo } from 'react';
import { Animated } from 'react-native';
import { OverlayProvider } from '@cbhq/cds-common/src/context/OverlayProvider';

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
        opacity={opacity}
        pin="all"
        renderToHardwareTextureAndroid
        background="backgroundOverlay"
        {...props}
      />
    </OverlayProvider>
  );
});

Overlay.displayName = 'Overlay';
