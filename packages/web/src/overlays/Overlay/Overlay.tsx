import React, { forwardRef, memo } from 'react';
import { OverlayProvider } from '@cbhq/cds-common/context/OverlayProvider';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@cbhq/cds-common/overlays/OverlayContentContext';

import { OverlayContent, OverlayProps } from './OverlayContent';

const overlayContentContextValue: OverlayContentContextValue = {
  isOverlay: true,
};

export const Overlay = memo(
  forwardRef<HTMLElement, OverlayProps>((props, forwardedRef) => {
    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <OverlayProvider>
          <OverlayContent ref={forwardedRef} {...props} />
        </OverlayProvider>
      </OverlayContentContext.Provider>
    );
  }),
);

Overlay.displayName = 'Overlay';
