import React, { memo, forwardRef } from 'react';
import { OverlayProvider } from '@cbhq/cds-common/context/OverlayProvider';

import { OverlayContent, OverlayProps } from './OverlayContent';

export const Overlay = memo(
  forwardRef<HTMLElement, OverlayProps>((props, forwardedRef) => {
    return (
      <OverlayProvider>
        <OverlayContent ref={forwardedRef} {...props} />
      </OverlayProvider>
    );
  }),
);

Overlay.displayName = 'Overlay';
