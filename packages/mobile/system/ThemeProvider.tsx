import React, { memo, useContext, useMemo } from 'react';
import {
  frontierSpectrumPalette,
  NewPartialPaletteConfig,
  SystemProviderProps,
} from '@cbhq/cds-common';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { SpectrumProvider } from '@cbhq/cds-common/spectrum/SpectrumProvider';
import { ThemeConfigContext } from '@cbhq/cds-common/system/ThemeConfigContext';
import { ThemeConfigProvider } from '@cbhq/cds-common/system/ThemeConfigProvider';

import { createFallbackThemeConfig, createThemeConfig } from './createThemeConfig';
import { ElevationConfigsProvider } from './ElevationConfigsProvider';
import { FeatureFlagContext } from './FeatureFlagContext';

export const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = memo(
  function ThemeProvider({ children, palette, name, scale, spectrum }) {
    const hasFrontier = useContext(FeatureFlagContext)?.frontierColor;
    const parentThemeConfigContext = useContext(ThemeConfigContext)?.config;
    const config = useMemo(() => {
      const parentThemeConfig = parentThemeConfigContext ?? createFallbackThemeConfig(hasFrontier);
      if (palette) {
        return createThemeConfig({
          parentThemeConfig,
          palette,
          hasFrontier,
          name: hasFrontier ? `${name}-frontier` : name,
        });
      }
      // This means this is the root ThemeProvider
      if (parentThemeConfigContext === undefined) return parentThemeConfig;
      // If frontier was updated we need ThemeConfigContext to update activeConfig
      if (hasFrontier)
        return createThemeConfig({
          parentThemeConfig,
          palette: frontierSpectrumPalette,
          hasFrontier,
          name: `${name}-frontier`,
        });
      // If only spectrum was overwritten we need ThemeConfigContext to update activeConfig
      if (spectrum) return parentThemeConfig;
      // Skip rendering ThemeConfigProvider if there are no changes
      return undefined;
    }, [hasFrontier, name, palette, parentThemeConfigContext, spectrum]);
    const skipThemeConfig = config === undefined;
    return (
      <ScaleProvider value={scale}>
        <SpectrumProvider value={spectrum}>
          {skipThemeConfig ? (
            children
          ) : (
            <ThemeConfigProvider value={config}>
              <ElevationConfigsProvider hasFrontier={hasFrontier} parentThemeConfig={config}>
                {children}
              </ElevationConfigsProvider>
            </ThemeConfigProvider>
          )}
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
