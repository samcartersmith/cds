import React, { memo } from 'react';
import { Animated } from 'react-native';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common2/overlays/OverlayContentContext';

import { VStack, VStackProps } from '../../layout/VStack';

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
      <VStack
        animated
        renderToHardwareTextureAndroid
        background="backgroundOverlay"
        opacity={opacity}
        pin="all"
        {...props}
      />
    </OverlayContentContext.Provider>
  );
});

Overlay.displayName = 'Overlay';
