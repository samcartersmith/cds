import React, { memo } from 'react';
import { Platform, ViewStyle } from 'react-native';
import memoize from 'lodash/memoize';
import {
  BorderWidth,
  PaletteBorder,
  Spectrum,
  ThemeConfig,
  ThemeConfigContextValue,
} from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { mergeThemeConfigs } from '@cbhq/cds-common/system/mergeThemeConfigs';
import { ThemeConfigProvider } from '@cbhq/cds-common/system/ThemeConfigProvider';
import { ElevationThemeConfig, ElevationChildrenThemeConfig } from '../types';

export type ElevationConfig = {
  WrapperForChildren: React.ComponentType;
  getBorderColor: (value?: PaletteBorder) => string;
  getBorderWidth: (value?: BorderWidth) => number | undefined;
  styles: ViewStyle;
  theme: ThemeConfigContextValue;
  level: 1 | 2;
};

/** A builder function which will return a util which can be
 * used to generate elevation styles based on an elevation config.
 */
export const elevationBuilder = memoize(
  function elevationBuilder({
    level,
    spectrum,
    themeConfig,
    themeElevation,
    themeElevationChildren,
    styles,
  }: {
    level: 1 | 2;
    spectrum: Spectrum;
    themeConfig: ThemeConfig;
    themeElevation: ElevationThemeConfig;
    themeElevationChildren: ElevationChildrenThemeConfig;
    styles: {
      elevation: number;
      shadowRadius: number;
      shadowOpacity: number;
    };
  }): ElevationConfig {
    const mergedConfig = mergeThemeConfigs(themeConfig, themeElevation);
    const mergedChildrenConfig = mergeThemeConfigs(themeConfig, themeElevationChildren);
    const activeConfig = spectrum === 'light' ? mergedConfig.light : mergedConfig.dark;

    function getBorderColor(value?: PaletteBorder) {
      const fallback = value ?? 'line';
      const alias = Platform.OS === 'android' ? 'transparent' : fallback;
      return activeConfig.rgbaStrings[alias];
    }

    function getBorderWidth(value?: BorderWidth) {
      const fallback = 'card';
      const borderWidthValue = borderWidth[value ?? fallback];
      if (Platform.OS === 'ios') {
        return borderWidthValue;
      }
      // Guarantee border is hidden on android unless dark mode
      if (spectrum === 'light') {
        return undefined;
      }
      return borderWidthValue;
    }

    const ElevationChildrenWrapper: React.FC = memo(({ children }) => (
      <ThemeConfigProvider value={mergedChildrenConfig}>{children}</ThemeConfigProvider>
    ));

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
      theme: {
        activeConfig,
        config: mergedConfig,
      },
    };
  },
  ({ level, spectrum, themeConfig }) =>
    `elevation-${level}-spectrum-${spectrum}-theme-${themeConfig.name}`,
);
