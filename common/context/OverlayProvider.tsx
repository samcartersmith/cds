import React, { memo } from 'react';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { SystemProvider, SystemProviderProps } from '../SystemProvider';
import { PartialPaletteConfig, Spectrum } from '../types';

export const overlayPalettes: Record<Spectrum, PartialPaletteConfig> = {
  light: {
    backgroundOverlay: ['gray80', 0.33],
  },
  dark: {
    backgroundOverlay: ['gray0', 0.5],
  },
};

export const OverlayProvider: React.FC<SystemProviderProps> = memo((props) => {
  const palette = useSpectrumConditional(overlayPalettes);
  return <SystemProvider palette={palette} {...props} />;
});

OverlayProvider.displayName = 'OverlayProvider';
