import React, { memo, useMemo } from 'react';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import type { ThemeConfig } from '@cbhq/cds-common/types';

import { createElevationConfigForSpectrum } from './createElevationConfigForSpectrum';
import { ElevationConfigsContext } from './ElevationConfigsContext';

export type ElevationConfigsProviderProps = {
  parentThemeConfig: ThemeConfig;
  children: React.ReactNode;
};

export const ElevationConfigsProvider = memo(
  ({ children, parentThemeConfig }: ElevationConfigsProviderProps) => {
    const spectrum = useSpectrum();
    const contextValue = useMemo(() => {
      return {
        elevation1: createElevationConfigForSpectrum({
          name: 'elevation1',
          spectrum,
          parentThemeConfig,
        }),
        elevation2: createElevationConfigForSpectrum({
          name: 'elevation2',
          spectrum,
          parentThemeConfig,
        }),
      };
    }, [spectrum, parentThemeConfig]);

    return (
      <ElevationConfigsContext.Provider value={contextValue}>
        {children}
      </ElevationConfigsContext.Provider>
    );
  },
);

ElevationConfigsProvider.displayName = 'ElevationConfigsProvider';
