import * as React from 'react';

import { PaletteConfigProvider } from '@cds/theme/palette/PaletteConfigProvider';
import { PaletteConfig } from '@cds/theme/palette/types';
import { ScaleProvider } from '@cds/theme/scale/ScaleProvider';
import { Scale } from '@cds/theme/scale/types';
import { SpectrumProvider } from '@cds/theme/spectrum/SpectrumProvider';
import { Spectrum } from '@cds/theme/spectrum/types';
import { ThemeManager } from '@cds/theme/ThemeManager';

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
