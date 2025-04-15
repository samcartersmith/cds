import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { docsTheme } from '@site/src/constants';
import type { Property } from 'csstype';
import { ColorScheme } from '@cbhq/cds-common2/core/theme';
import type { ThemeConfig } from '@cbhq/cds-web2/core/theme';
import { useHasMounted } from '@cbhq/cds-web2/hooks/useHasMounted';
import { useMediaQuery } from '@cbhq/cds-web2/hooks/useMediaQuery';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

type ThemeOption = {
  label: string;
  lightValue: Property.Color;
  darkValue: Property.Color;
};

type UnifiedThemeContextValue = {
  /** The activeColorScheme for the docs ThemeProvider */
  docsColorScheme: ColorScheme;
  /** Set the activeColorScheme for the docs ThemeProvider */
  setDocsColorScheme: (scheme: ColorScheme) => void;
  /** The theme for the docs ThemeProvider */
  docsTheme: ThemeConfig;
  /** The activeColorScheme for the code playground ThemeProvider */
  playgroundColorScheme: ColorScheme;
  /** Set the activeColorScheme for the code playground ThemeProvider */
  setPlaygroundColorScheme: (scheme: ColorScheme) => void;
  /** The theme for the code playground ThemeProvider */
  playgroundTheme: ThemeConfig;
  /** Set the activeColorScheme for both the docs ThemeProvider and the code playground ThemeProvider */
  setUnifiedColorScheme: (scheme: ColorScheme) => void;
  /** The themeOption for the code playground ThemeProvider */
  themeOption: ThemeOption;
  /** Set the themeOption for the code playground ThemeProvider */
  setThemeOption: (option: ThemeOption) => void;
};

export const themeOptions: ThemeOption[] = [
  {
    label: 'Blue theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.blue50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.blue70})`,
  },
  {
    label: 'Green theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.green50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.green60})`,
  },
  {
    label: 'Red theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.red50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.red60})`,
  },
  {
    label: 'Purple theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.purple50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.purple60})`,
  },
] as const;

const UnifiedThemeContext = createContext<UnifiedThemeContextValue | undefined>(undefined);

export const useUnifiedTheme = () => {
  const context = useContext(UnifiedThemeContext);
  if (!context) throw Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
  return context;
};

export const useDocsTheme = () => {
  const { docsColorScheme, setDocsColorScheme, docsTheme } = useUnifiedTheme();
  return {
    colorScheme: docsColorScheme,
    setColorScheme: setDocsColorScheme,
    theme: docsTheme,
  };
};

export const usePlaygroundTheme = () => {
  const { playgroundColorScheme, setPlaygroundColorScheme, playgroundTheme } = useUnifiedTheme();
  return {
    colorScheme: playgroundColorScheme,
    setColorScheme: setPlaygroundColorScheme,
    theme: playgroundTheme,
  };
};

type UnifiedThemeProviderProps = {
  children: React.ReactNode;
  baseDocsTheme?: ThemeConfig;
  basePlaygroundTheme?: ThemeConfig;
};

const colorSchemeStorageKey = 'cdsColorScheme';

export const UnifiedThemeProvider = ({
  children,
  baseDocsTheme = docsTheme,
  basePlaygroundTheme = defaultTheme,
}: UnifiedThemeProviderProps) => {
  const { setColorMode } = useColorMode();
  const [docsColorScheme, setDocsColorScheme] = useState<ColorScheme>('dark');
  const [themeOption, setThemeOption] = useState<ThemeOption>(themeOptions[0]);
  const [playgroundColorScheme, setPlaygroundColorScheme] = useState<ColorScheme>(docsColorScheme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const hasMounted = useHasMounted();

  const docsThemeWithOption: ThemeConfig = useMemo(() => {
    return {
      ...baseDocsTheme,
      lightColor: {
        ...defaultTheme.lightColor,
        ...baseDocsTheme.lightColor,
        bgPrimary: themeOption.lightValue,
        fgPrimary: themeOption.lightValue,
      },
      darkColor: {
        ...defaultTheme.darkColor,
        ...baseDocsTheme.darkColor,
        bgPrimary: themeOption.darkValue,
        fgPrimary: themeOption.darkValue,
      },
    } satisfies ThemeConfig;
  }, [baseDocsTheme, themeOption]);

  const playgroundThemeWithOption: ThemeConfig = useMemo(() => {
    return {
      ...basePlaygroundTheme,
      lightColor: {
        ...defaultTheme.lightColor,
        ...basePlaygroundTheme.lightColor,
        bgPrimary: themeOption.lightValue,
        fgPrimary: themeOption.lightValue,
      },
      darkColor: {
        ...defaultTheme.darkColor,
        ...basePlaygroundTheme.darkColor,
        bgPrimary: themeOption.darkValue,
        fgPrimary: themeOption.darkValue,
      },
    } satisfies ThemeConfig;
  }, [basePlaygroundTheme, themeOption]);

  /** Sets the docsColorScheme and saves the value to localStorage */
  const updateDocsColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      localStorage.setItem(colorSchemeStorageKey, colorScheme);
      setDocsColorScheme(colorScheme);
      // Keep Docusaurus' colorMode in sync with the colorScheme, this affects
      // whether Docusaurus default styles are in light or dark mode.
      setColorMode(colorScheme);
    },
    [setDocsColorScheme, setColorMode],
  );

  /** Sets the docsColorScheme and saves the value to localStorage, then sets the playgroundColorScheme */
  const updateUnifiedColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      updateDocsColorScheme(colorScheme);
      setPlaygroundColorScheme(colorScheme);
    },
    [updateDocsColorScheme],
  );

  /** Sets the docsColorScheme and the playgroundColorScheme, without saving to localStorage */
  const updateInitialColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      setDocsColorScheme(colorScheme);
      // Keep Docusaurus' colorMode in sync with the colorScheme, this affects
      // whether Docusaurus default styles are in light or dark mode.
      setColorMode(colorScheme);
      setPlaygroundColorScheme(colorScheme);
    },
    [setColorMode],
  );

  /** Ensures the docsColorScheme matches the colorScheme preference from localStorage */
  useEffect(() => {
    const localColorScheme = localStorage.getItem(colorSchemeStorageKey);
    const systemColorScheme = prefersDarkMode ? 'dark' : 'light';
    const colorScheme = localColorScheme ?? (hasMounted && systemColorScheme);
    if (colorScheme && colorScheme !== docsColorScheme)
      updateInitialColorScheme(colorScheme as ColorScheme);
  }, [hasMounted, prefersDarkMode, docsColorScheme, updateInitialColorScheme]);

  const api = useMemo<UnifiedThemeContextValue>(
    () => ({
      docsColorScheme,
      setDocsColorScheme: updateDocsColorScheme,
      docsTheme: docsThemeWithOption,
      playgroundColorScheme,
      setPlaygroundColorScheme,
      playgroundTheme: playgroundThemeWithOption,
      setUnifiedColorScheme: updateUnifiedColorScheme,
      themeOption,
      setThemeOption,
    }),
    [
      docsColorScheme,
      updateDocsColorScheme,
      docsThemeWithOption,
      playgroundColorScheme,
      playgroundThemeWithOption,
      updateUnifiedColorScheme,
      themeOption,
    ],
  );

  return <UnifiedThemeContext.Provider value={api}>{children}</UnifiedThemeContext.Provider>;
};
