/* eslint-disable react/jsx-no-useless-fragment */
import React, { createContext, memo, useContext } from 'react';

import { PaletteConfigProvider } from '../palette/PaletteConfigProvider';
import { useSpectrum } from '../spectrum/useSpectrum';
import { elevationChildrenPalette, elevationPalette } from '../tokens/elevation';
import { ElevationLevels } from '../types';

export type ElevationProviderProps = {
  /** Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
};

const ElevationContext = createContext<ElevationLevels | undefined>(undefined);
const ElevationChildContext = createContext<boolean>(false);

export const ElevationProvider: React.FC<React.PropsWithChildren<ElevationProviderProps>> = memo(
  ({ elevation, children }) => {
    const spectrum = useSpectrum();
    if (elevation) {
      return (
        <ElevationContext.Provider value={elevation}>
          <PaletteConfigProvider
            value={spectrum === 'dark' ? elevationPalette[elevation] : undefined}
          >
            {children}
          </PaletteConfigProvider>
        </ElevationContext.Provider>
      );
    }

    return <>{children}</>;
  },
);

export const ElevationChildrenProvider: React.FC<React.PropsWithChildren<unknown>> = memo(
  ({ children }) => {
    /** Check if child of Elevated surface */
    const elevation = useContext(ElevationContext);
    /** Only apply overrides to children in dark mode */
    const spectrum = useSpectrum();
    if (elevation && spectrum === 'dark') {
      return (
        <ElevationChildContext.Provider value>
          <PaletteConfigProvider value={elevationChildrenPalette[elevation]}>
            {children}
          </PaletteConfigProvider>
        </ElevationChildContext.Provider>
      );
    }

    return <>{children}</>;
  },
);

export const useElevationChildOverrides = () => useContext(ElevationChildContext);

ElevationProvider.displayName = 'ElevationProvider';
ElevationChildrenProvider.displayName = 'ElevationChildrenProvider';
