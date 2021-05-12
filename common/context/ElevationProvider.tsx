import React, { memo } from 'react';

import { emptyObject } from '@cbhq/cds-utils';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { PaletteConfigProvider } from '../palette/PaletteConfigProvider';
import { ElevationLevels, PartialPaletteConfig, Spectrum } from '../types';

export type ElevationProviderProps = { elevation?: ElevationLevels };
type ElevationPalette = Record<ElevationLevels, Record<Spectrum, PartialPaletteConfig>>;
type ElevationPaletteOverrideProps = { elevation: ElevationLevels };

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
      background: 'gray15',
    },
  },
};

const ElevationPaletteOverride: React.FC<ElevationPaletteOverrideProps> = memo(
  ({ elevation, children }) => {
    const palette = useSpectrumConditional(elevationPalettes[elevation]);
    return <PaletteConfigProvider value={palette}>{children}</PaletteConfigProvider>;
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
