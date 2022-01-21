import React, { useMemo, memo } from 'react';
import memoize from 'lodash/memoize';
import type { Spectrum, ThemeConfig } from '@cbhq/cds-common/types';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { useThemeConfig } from '@cbhq/cds-common/system/useThemeConfig';
import { themePartialElevation1 } from '@cbhq/cds-common/themes/themeElevation1';
import { themePartialElevation2 } from '@cbhq/cds-common/themes/themeElevation2';
import { themePartialElevation1Children } from '@cbhq/cds-common/themes/themeElevation1Children';
import { themePartialElevation2Children } from '@cbhq/cds-common/themes/themeElevation2Children';
import { ElevationStylesContext } from './ElevationStylesContext';
import { elevationBuilder } from './elevationBuilder';

const getElevationStyles = memoize(
  function getElevationStyles(spectrum: Spectrum, themeConfig: ThemeConfig) {
    return {
      elevation1: elevationBuilder({
        level: 1,
        spectrum,
        themeConfig,
        themeElevation: themePartialElevation1,
        themeElevationChildren: themePartialElevation1Children,
        styles: {
          elevation: 2,
          shadowOpacity: 0.02,
          shadowRadius: 12,
        },
      }),
      elevation2: elevationBuilder({
        level: 2,
        spectrum,
        themeConfig,
        themeElevation: themePartialElevation2,
        themeElevationChildren: themePartialElevation2Children,
        styles: {
          elevation: 8,
          shadowOpacity: 0.12,
          shadowRadius: 24,
        },
      }),
    };
  },
  (spectrum, config) => `spectrum-${spectrum}-${config.name}`,
);

export const ElevationStylesProvider: React.FC = memo(({ children }) => {
  const theme = useThemeConfig();
  const spectrum = useSpectrum();
  const contextValue = useMemo(() => getElevationStyles(spectrum, theme.config), [spectrum, theme]);

  return (
    <ElevationStylesContext.Provider value={contextValue}>
      {children}
    </ElevationStylesContext.Provider>
  );
});

ElevationStylesProvider.displayName = 'ElevationStylesProvider';
