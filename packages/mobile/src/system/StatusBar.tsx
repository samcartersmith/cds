import React, { memo, useCallback, useMemo } from 'react';
import {
  Platform,
  StatusBar as RNStatusBar,
  StatusBarProps as RNStatusBarProps,
} from 'react-native';
import { isLightOrDarkColor } from '@cbhq/cds-common/color/isLightOrDarkColor';
import { emptyObject } from '@cbhq/cds-utils';

import { usePalette } from '../hooks/usePalette';
import { paletteConfigToRgbaStrings } from '../utils/palette';

import { ThemeProviderProps } from './ThemeProvider';

export type StatusBarProps = RNStatusBarProps & Omit<ThemeProviderProps, 'scale' | 'name'>;

/**
 * If bar-style is 'dark-content' that means app has a light background with dark text and icons.
 * If bar-style is 'light-content' that means app has a dark background with light text and icons.
 */
export const useStatusBarStyle = ({
  palette,
  spectrum,
}: StatusBarProps | undefined = emptyObject) => {
  const contextPalette = usePalette();
  return useMemo(() => {
    const paletteOverride = palette && paletteConfigToRgbaStrings(palette, spectrum ?? 'light');
    const backgroundColor = paletteOverride?.background ?? contextPalette.background;
    const luminosity = isLightOrDarkColor(backgroundColor);
    return luminosity === 'light' ? 'dark-content' : 'light-content';
  }, [contextPalette.background, palette, spectrum]);
};

// Imperative way to update StatusBar styles
export const useStatusBarUpdater = ({
  palette,
  spectrum,
}: StatusBarProps | undefined = emptyObject) => {
  const barStyle = useStatusBarStyle({ palette, spectrum });
  return useCallback(() => {
    // Second argument is to ensure StatusBar style animates in
    RNStatusBar.setBarStyle(barStyle, true);
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('transparent');
      RNStatusBar.setTranslucent(true);
    }
  }, [barStyle]);
};

export const StatusBar = memo(
  ({
    animated,
    backgroundColor,
    barStyle,
    hidden,
    networkActivityIndicatorVisible,
    palette,
    showHideTransition,
    spectrum,
    translucent,
  }: StatusBarProps) => {
    const defaultBarStyle = useStatusBarStyle({ palette, spectrum });
    return (
      <RNStatusBar
        animated={animated ?? true}
        backgroundColor={backgroundColor ?? 'transparent'}
        barStyle={barStyle ?? defaultBarStyle}
        hidden={hidden}
        networkActivityIndicatorVisible={networkActivityIndicatorVisible}
        showHideTransition={showHideTransition}
        translucent={translucent ?? true}
      />
    );
  },
);

StatusBar.displayName = 'StatusBar';
