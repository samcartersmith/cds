import React, { memo, useMemo } from 'react';
import { emptyObject } from '@cbhq/cds-utils';

import { useSpectrum } from '../spectrum/useSpectrum';
import { PartialPaletteConfig } from '../types';

import { darkDefaultPalette, defaultPalette as defaultLightPalette } from './constants';
import { PaletteConfigContext } from './context';
import { usePaletteConfig } from './usePaletteConfig';

export type PaletteConfigProviderProps = {
  value?: PartialPaletteConfig;
};

export const PaletteConfigProvider: React.FC<React.PropsWithChildren<PaletteConfigProviderProps>> =
  memo(({ value = emptyObject, children }) => {
    const palette = usePaletteConfig();
    const spectrum = useSpectrum();
    const defaultPalette = spectrum === 'light' ? defaultLightPalette : darkDefaultPalette;
    const memoizedPaletteConfig = useMemo(
      () => ({
        // Fallback to defaultPalette in case root context has partial palette config
        ...defaultPalette,
        // Fallback to values from parent palette
        ...palette,
        // Custom palette overrides
        ...value,
      }),
      [defaultPalette, palette, value],
    );

    return (
      <PaletteConfigContext.Provider value={memoizedPaletteConfig}>
        {children}
      </PaletteConfigContext.Provider>
    );
  });

PaletteConfigProvider.displayName = 'PaletteProvider';
