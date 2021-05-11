import React, { memo, useCallback, useMemo } from 'react';

import { getColorLuminosity } from '@cbhq/cds-common/utils/color';
import { emptyObject } from '@cbhq/cds-utils';
import { Platform, StatusBar as RNStatusBar, StatusBarStyle } from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { paletteConfigToRgbaStrings } from '../utils/palette';
import { ThemeProviderProps } from './ThemeProvider';

export type StatusBarProps = Omit<ThemeProviderProps, 'scale'> & {
  barStyle?: StatusBarStyle;
};
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
    const luminosity = getColorLuminosity(backgroundColor);
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

export const StatusBar = memo((props: StatusBarProps) => {
  const barStyle = useStatusBarStyle(props);
  return (
    <RNStatusBar
      animated
      barStyle={props?.barStyle ?? barStyle}
      backgroundColor="transparent"
      translucent
    />
  );
});

StatusBar.displayName = 'StatusBar';
