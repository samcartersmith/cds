import React, { memo, useMemo } from 'react';

import { emptyObject } from '@cbhq/cds-utils';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { PaletteConfigProvider } from '../palette/PaletteConfigProvider';
import { ElevationLevels, PartialPaletteConfig, Spectrum } from '../types';

export type ElevationProviderProps = { elevation?: ElevationLevels };
type ElevationPalette = Record<ElevationLevels, Record<Spectrum, PartialPaletteConfig>>;
type ElevationPaletteOverrideProps = { elevation: ElevationLevels };

const sharedOverrides = {
  // Render secondary background as transparent so pressable cards with secondary buttons
  // appear as a single surface on press.
  secondary: ['gray0', 0],
} as const;

export const elevationPalettes: ElevationPalette = {
  1: {
    light: emptyObject,
    dark: {
      background: 'gray5',
    },
  },
  2: {
    light: emptyObject,
    dark: {
      background: 'gray10',
      line: ['gray60', 0.66],
    },
  },
};

const ElevationPaletteOverride: React.FC<ElevationPaletteOverrideProps> = memo(
  ({ elevation, children }) => {
    const palette = useSpectrumConditional(elevationPalettes[elevation]);
    const paletteOverride = useMemo(() => ({ ...sharedOverrides, ...palette }), [palette]);
    return <PaletteConfigProvider value={paletteOverride}>{children}</PaletteConfigProvider>;
  }
);

export const ElevationProvider: React.FC<ElevationProviderProps> = memo(
  ({ elevation, children }) => {
    if (elevation) {
      return <ElevationPaletteOverride elevation={elevation}>{children}</ElevationPaletteOverride>;
    }
    return <React.Fragment>{children}</React.Fragment>;
  }
);

ElevationPaletteOverride.displayName = 'ElevationPaletteOverride';
ElevationProvider.displayName = 'ElevationProvider';
