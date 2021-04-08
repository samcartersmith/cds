// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, memo, useLayoutEffect, useRef } from 'react';

import { emptyObject, rgba2hex } from '@cbhq/cds-utils';
import { Platform } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { usePalette } from '../hooks/usePalette';
import { convertPalette } from '../utils/convertPalette';
import { useStatusBarStyle } from './StatusBar';
import { ThemeProviderProps } from './ThemeProvider';

export type AndroidNavigationBarProps = Omit<ThemeProviderProps, 'scale'>;

export const useAndroidNavigationBarUpdater = ({
  palette,
  spectrum,
}: AndroidNavigationBarProps | undefined = emptyObject) => {
  const statusBarStyle = useStatusBarStyle({ palette, spectrum });
  const contextPalette = usePalette();
  const paletteOverride = palette && convertPalette(palette, spectrum ?? 'light');
  const { background } = paletteOverride ?? contextPalette;
  return useCallback(() => {
    // Don't change the navigation bar color on Android 7 (API 25) or lower.
    // On these versions, Android doesn't support changing the color of the navigation bar icons, meaning
    // we risk having a light colored navigation bar with the default white icons.
    if (Platform.OS === 'android' && Platform.Version > 25) {
      return changeNavigationBarColor(
        // All palette values are in rgba and color has to be converted to hex.
        rgba2hex(background),
        // dark-content means light background
        statusBarStyle === 'dark-content',
        true
      );
    }
  }, [background, statusBarStyle]);
};

export const AndroidNavigationBar = memo((props: AndroidNavigationBarProps) => {
  const updateAndroidNavigationBar = useAndroidNavigationBarUpdater(props);
  const hasRun = useRef(false);
  useLayoutEffect(() => {
    if (hasRun.current || Platform.OS === 'ios') return;
    updateAndroidNavigationBar();
  }, [updateAndroidNavigationBar]);

  return null;
});

AndroidNavigationBar.displayName = 'AndroidNavigationBar';
