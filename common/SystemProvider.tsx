import { memo } from 'react';

import { PaletteConfigProvider } from './palette/PaletteConfigProvider';
import { ScaleProvider } from './scale/ScaleProvider';
import { SpectrumProvider } from './spectrum/SpectrumProvider';
import { PartialPaletteConfig, Scale, Spectrum } from './types';

export type SystemProviderProps = {
  /**
   * Determines which sizes to pull for typography, spacing, icons, and layout,
   * and is based on an applications information density.
   * @default large
   */
  scale?: Scale;
  /**
   * Determines which spectrum a palette will pull from. For example, in the light spectrum,
   * `gray100`, maps to black while in the dark spectrum `gray100` maps to white.
   * The default palette CDS ships with assigns foreground to `gray100`. `foreground`
   * is used as the default color in Text components.
   * @default light
   */
  spectrum?: Spectrum;
  /**
   * Takes a configurable palette. If a partial palette is provided it will be merged with the
   * closest parent `ThemeProvider` if present, if not it will be fallback to merging with the
   * default CDS palette.
   */
  palette?: PartialPaletteConfig;
};

export const SystemProvider: React.FC<SystemProviderProps> = memo(
  ({ scale, spectrum, palette, children }) => {
    return (
      <ScaleProvider value={scale}>
        <SpectrumProvider value={spectrum}>
          <PaletteConfigProvider value={palette}>{children}</PaletteConfigProvider>
        </SpectrumProvider>
      </ScaleProvider>
    );
  }
);

SystemProvider.displayName = 'SystemProvider';
