import React, { memo } from 'react';
import { Platform, ViewStyle } from 'react-native';
import {
  BorderWidth,
  ElevationLevels,
  PaletteBorder,
  Spectrum,
  ThemeConfig,
  ThemeConfigContextValue,
} from '@cbhq/cds-common';
import {
  elevation1ChildrenPalette,
  elevation1Palette,
  elevation2ChildrenPalette,
  elevation2Palette,
  frontierSpectrumPalette,
} from '@cbhq/cds-common/palette/constants';
import { ThemeConfigContext } from '@cbhq/cds-common/system/ThemeConfigContext';
import { borderWidth } from '@cbhq/cds-common/tokens/borderWidth';

import { createThemeConfig } from './createThemeConfig';

type ElevationLevel = Exclude<ElevationLevels, 0>;
export type ElevationConfigForSpectrum = {
  WrapperForChildren: React.ComponentType<React.PropsWithChildren<unknown>>;
  getBorderColor: (value?: PaletteBorder) => string;
  getBorderWidth: (value?: BorderWidth) => number | undefined;
  styles: ViewStyle;
  themeConfig: ThemeConfigContextValue;
  level: ElevationLevel;
};
export type CreateElevationConfigForSpectrumParams = {
  name: keyof typeof elevations;
  parentThemeConfig: ThemeConfig;
  spectrum: Spectrum;
  hasFrontier?: boolean;
};
const elevations = {
  elevation1: {
    level: 1,
    palette: elevation1Palette,
    childrenPalette: elevation1ChildrenPalette,
    childrenName: 'elevation1Children',
    styles: {
      elevation: 2,
      shadowOpacity: 0.02,
      shadowRadius: 12,
    },
  },
  elevation2: {
    level: 2,
    palette: elevation2Palette,
    childrenPalette: elevation2ChildrenPalette,
    childrenName: 'elevation2Children',
    styles: {
      elevation: 8,
      shadowOpacity: 0.12,
      shadowRadius: 24,
    },
  },
} as const;
/** Merges a parentThemeConfig with elevation palette to generate theme config to be used in components with elevation
 */
export const createElevationConfigForSpectrum = ({
  name,
  spectrum,
  parentThemeConfig,
  hasFrontier,
}: CreateElevationConfigForSpectrumParams): ElevationConfigForSpectrum => {
  const { level, palette, childrenName, childrenPalette, styles } = elevations[name];
  const config = createThemeConfig({
    hasFrontier,
    name,
    palette: {
      light: { transparent: parentThemeConfig.light.palette.background },
      dark: palette.dark,
    },
    parentThemeConfig,
  });
  let childrenConfig = config;
  // Only update childrenConfig in dark mode
  if (spectrum === 'dark') {
    childrenConfig = createThemeConfig({
      hasFrontier,
      name: childrenName,
      parentThemeConfig: config,
      palette: {
        // frontier buttons don't have border color like old ones. This makes it so frontier buttons are visible on elevated surfaces.
        dark: hasFrontier
          ? { ...childrenPalette.dark, secondary: frontierSpectrumPalette.dark.secondary }
          : childrenPalette.dark,
      },
    });
  }

  const activeConfig = spectrum === 'light' ? config.light : config.dark;

  function getBorderColor(value: PaletteBorder = 'line') {
    const alias = Platform.OS === 'android' ? 'transparent' : value;
    return activeConfig.rgbaStrings[alias];
  }
  function getBorderWidth(value: BorderWidth = 'card') {
    const borderWidthValue = borderWidth[value];
    if (Platform.OS === 'ios') {
      return borderWidthValue;
    }
    // Guarantee border is hidden on android unless dark mode
    if (spectrum === 'light') {
      return undefined;
    }
    return borderWidthValue;
  }

  const childrenContextValue = {
    config: childrenConfig,
    activeConfig: spectrum === 'light' ? childrenConfig.light : childrenConfig.dark,
  };

  const ElevationChildrenWrapper: React.FC<React.PropsWithChildren<unknown>> = memo(
    function ElevationChildrenWrapper({ children }) {
      return (
        <ThemeConfigContext.Provider value={childrenContextValue}>
          {children}
        </ThemeConfigContext.Provider>
      );
    },
  );
  ElevationChildrenWrapper.displayName = 'ElevationChildrenWrapper';
  return {
    level,
    styles: {
      elevation: styles.elevation,
      shadowRadius: styles.shadowRadius,
      shadowOpacity: styles.shadowOpacity,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      borderColor: getBorderColor(),
      borderWidth: getBorderWidth(),
      overflow: 'visible',
    },
    getBorderColor,
    getBorderWidth,
    WrapperForChildren: ElevationChildrenWrapper,
    themeConfig: {
      config,
      activeConfig,
    },
  };
};
