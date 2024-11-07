import React, { memo, useMemo } from 'react';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { PartialPaletteConfig } from '../types';

import { darkDefaultPalette, defaultPalette as lightDefaultPalette } from './constants';
import { PaletteConfigContext, PaletteOverridesContext } from './context';
import { usePaletteOverrides } from './usePaletteOverrides';

export type PaletteConfigProviderProps = {
  value?: PartialPaletteConfig;
};

const defaultOverrides = {};

export const PaletteConfigProvider: React.FC<React.PropsWithChildren<PaletteConfigProviderProps>> =
  memo(({ value: paletteOverrides = defaultOverrides, children }) => {
    const parentPaletteOverrides = usePaletteOverrides();

    // Construct the defaultPalette with color overrides based on the current spectrum
    const defaultPalette = useSpectrumConditional({
      light: lightDefaultPalette,
      dark: darkDefaultPalette,
    });

    // merge with parent overrides
    const overrides = useMemo(
      () => ({ ...parentPaletteOverrides, ...paletteOverrides }),
      [paletteOverrides, parentPaletteOverrides],
    );

    const palette = useMemo(
      () => ({
        ...defaultPalette,
        ...overrides,
      }),
      [overrides, defaultPalette],
    );

    return (
      <PaletteConfigContext.Provider value={palette}>
        <PaletteOverridesContext.Provider value={overrides}>
          {children}
        </PaletteOverridesContext.Provider>
      </PaletteConfigContext.Provider>
    );
  });

PaletteConfigProvider.displayName = 'PaletteProvider';
