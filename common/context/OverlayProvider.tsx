import React, { memo } from 'react';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { SystemProvider, SystemProviderProps } from '../SystemProvider';
import { PartialPaletteConfig } from '../types';

const darkPalette: PartialPaletteConfig = {
  backgroundOverlay: ['gray0', 0.5],
};

export const OverlayProvider: React.FC<SystemProviderProps> = memo(props => {
  const palette = useSpectrumConditional({
    light: undefined,
    dark: darkPalette,
  });
  return <SystemProvider palette={palette} {...props} />;
});

OverlayProvider.displayName = 'OverlayProvider';
