import React, { useMemo, memo } from 'react';
import type { ThemeConfig } from '@cbhq/cds-common/types';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { ElevationConfigsContext } from './ElevationConfigsContext';
import { createElevationConfigForSpectrum } from './createElevationConfigForSpectrum';

export type ElevationConfigsProviderProps = {
  parentThemeConfig: ThemeConfig;
  hasFrontier?: boolean;
  children: React.ReactNode;
};

export const ElevationConfigsProvider = memo(
  ({ children, parentThemeConfig, hasFrontier }: ElevationConfigsProviderProps) => {
    const spectrum = useSpectrum();
    const contextValue = useMemo(() => {
      return {
        elevation1: createElevationConfigForSpectrum({
          name: 'elevation1',
          spectrum,
          parentThemeConfig,
          hasFrontier,
        }),
        elevation2: createElevationConfigForSpectrum({
          name: 'elevation2',
          spectrum,
          parentThemeConfig,
          hasFrontier,
        }),
      };
    }, [spectrum, parentThemeConfig, hasFrontier]);

    return (
      <ElevationConfigsContext.Provider value={contextValue}>
        {children}
      </ElevationConfigsContext.Provider>
    );
  },
);

ElevationConfigsProvider.displayName = 'ElevationConfigsProvider';
