import * as React from 'react';

import { PaletteConfigProvider } from './palette/PaletteConfigProvider';
import { PaletteConfig } from './palette/types';
import { ScaleProvider } from './scale/ScaleProvider';
import { Scale } from './scale/types';
import { SpectrumProvider } from './spectrum/SpectrumProvider';
import { Spectrum } from './spectrum/types';
import { ThemeManager } from './ThemeManager';

type ThemeProviderProps = {
  scale?: Scale;
  spectrum?: Spectrum;
  palette?: PaletteConfig;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = React.memo(
  ({ scale, spectrum, palette, children }) => {
    return (
      <ScaleProvider value={scale}>
        <SpectrumProvider value={spectrum}>
          <PaletteConfigProvider value={palette}>
            <ThemeManager>{children}</ThemeManager>
          </PaletteConfigProvider>
        </SpectrumProvider>
      </ScaleProvider>
    );
  }
);

ThemeProvider.displayName = 'ThemeProvider';
