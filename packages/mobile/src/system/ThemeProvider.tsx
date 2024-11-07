import React, { memo, useContext, useMemo } from 'react';
import { NewPartialPaletteConfig, SystemProviderProps } from '@cbhq/cds-common';
import { PaletteOverridesContext } from '@cbhq/cds-common/palette/context';
import { usePaletteOverrides } from '@cbhq/cds-common/palette/usePaletteOverrides';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { SpectrumProvider } from '@cbhq/cds-common/spectrum/SpectrumProvider';
import { ThemeConfigContext } from '@cbhq/cds-common/system/ThemeConfigContext';
import { ThemeConfigProvider } from '@cbhq/cds-common/system/ThemeConfigProvider';

import { createThemeConfig, useFallbackThemeConfig } from './createThemeConfig';
import { ElevationConfigsProvider } from './ElevationConfigsProvider';

export const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = memo(
  function ThemeProvider({ children, palette: paletteOverrides, name, scale, spectrum }) {
    // this is parent theme config
    const parentThemeConfigContext = useContext(ThemeConfigContext)?.config;
    // this is the default theme config
    const defaultThemeConfig = useFallbackThemeConfig();
    const parentPaletteOverrides = usePaletteOverrides();

    // merge with parent overrides
    const overrides = useMemo(
      () => ({ ...parentPaletteOverrides, ...paletteOverrides }),
      [paletteOverrides, parentPaletteOverrides],
    );

    const config = useMemo(() => {
      const parentThemeConfig = parentThemeConfigContext ?? defaultThemeConfig;
      // if current overrides, merge with parent overrides to create a new config
      if (paletteOverrides) {
        return createThemeConfig({
          parentThemeConfig,
          palette: overrides,
          name,
        });
      }

      // This means this is the root ThemeProvider
      if (parentThemeConfigContext === undefined) return defaultThemeConfig;

      // If only spectrum was overwritten we need ThemeConfigContext to update activeConfig
      if (spectrum) return parentThemeConfig;

      // Skip rendering ThemeConfigProvider if there are no changes
      return undefined;
    }, [defaultThemeConfig, name, overrides, parentThemeConfigContext, paletteOverrides, spectrum]);

    const skipThemeConfig = config === undefined;
    return (
      <ScaleProvider value={scale}>
        <SpectrumProvider value={spectrum}>
          <PaletteOverridesContext.Provider value={overrides}>
            {skipThemeConfig ? (
              children
            ) : (
              <ThemeConfigProvider value={config}>
                <ElevationConfigsProvider parentThemeConfig={config}>
                  {children}
                </ElevationConfigsProvider>
              </ThemeConfigProvider>
            )}
          </PaletteOverridesContext.Provider>
        </SpectrumProvider>
      </ScaleProvider>
    );
  },
);
export const NormalScaleProvider = memo((props: SystemProviderProps) => (
  <ThemeProvider name="normal-only-scale" scale="large" {...props} />
));
export const DenseScaleProvider = memo((props: SystemProviderProps) => (
  <ThemeProvider name="dense-only-scale" scale="xSmall" {...props} />
));
export const DarkModeProvider = memo((props: SystemProviderProps) => (
  <ThemeProvider name="dark-only-spectrum" spectrum="dark" {...props} />
));
export const LightModeProvider = memo((props: SystemProviderProps) => (
  <ThemeProvider name="light-only-spectrum" spectrum="light" {...props} />
));
export type ThemeProviderProps = SystemProviderProps & {
  /** A unique name for the ThemeProvider instance.
   * This is used to optimize when merging palettes / creating themes at runtime.
   * Any partial custom palettes have to be merged with the parent palette config.
   * On mobile this merging / conversion to rgba strings can be quite expensive so the name prop
   * allows CDS to generate a unique cache key based on the parent name + override name so we can
   * reuse conversions in other instances with same config combination.
   * There is no way to guarantee names are unique so we recommend naming a ThemeProvider in such a way to
   * as to avoid collisions with other ids in the cache.
   */
  name: string;
  palette?: NewPartialPaletteConfig;
};
ThemeProvider.displayName = 'ThemeProvider';
NormalScaleProvider.displayName = 'NormalScaleProvider';
DenseScaleProvider.displayName = 'DenseScaleProvider';
DarkModeProvider.displayName = 'DarkModeProvider';
LightModeProvider.displayName = 'LightModeProvider';
