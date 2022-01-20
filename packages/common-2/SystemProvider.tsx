import React, { memo } from 'react';

import { PaletteConfigProvider } from './palette/PaletteConfigProvider';
import { ScaleProvider } from './scale/ScaleProvider';
import { SpectrumProvider } from './spectrum/SpectrumProvider';
import type { ThemeProviderBaseProps } from './types';

export type SystemProviderProps = ThemeProviderBaseProps;

export const SystemProvider: React.FC<SystemProviderProps> = memo(
  ({ scale, spectrum, palette, children }) => {
    return (
      <ScaleProvider value={scale}>
        <SpectrumProvider value={spectrum}>
          <PaletteConfigProvider value={palette}>{children}</PaletteConfigProvider>
        </SpectrumProvider>
      </ScaleProvider>
    );
  },
);

SystemProvider.displayName = 'SystemProvider';
