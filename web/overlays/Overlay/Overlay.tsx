import React, { memo } from 'react';
import { OverlayProvider } from '@cbhq/cds-common/context/OverlayProvider';

import { OverlayContent, OverlayProps } from './OverlayContent';

export const Overlay: React.FC<OverlayProps> = memo((props) => {
  return (
    <OverlayProvider>
      <OverlayContent {...props} />
    </OverlayProvider>
  );
});

Overlay.displayName = 'Overlay';
