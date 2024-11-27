import React, { forwardRef, memo } from 'react';
import {
  type OverlayContentContextValue,
  OverlayContentContext,
} from '@cbhq/cds-common/overlays/OverlayContentContext';

import { OverlayContent, OverlayProps } from './OverlayContent';

const overlayContentContextValue: OverlayContentContextValue = {
  isOverlay: true,
};

export const Overlay = memo(
  forwardRef<HTMLElement, OverlayProps>((props, forwardedRef) => {
    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <OverlayContent ref={forwardedRef} {...props} />
      </OverlayContentContext.Provider>
    );
  }),
);

Overlay.displayName = 'Overlay';
