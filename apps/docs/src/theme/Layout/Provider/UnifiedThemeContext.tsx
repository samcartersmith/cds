import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { docsTheme } from '@site/src/constants';
import { ColorScheme } from '@cbhq/cds-common2/core/theme';
import type { ThemeConfig } from '@cbhq/cds-web2/core/theme';
import { useHasMounted } from '@cbhq/cds-web2/hooks/useHasMounted';
import { useMediaQuery } from '@cbhq/cds-web2/hooks/useMediaQuery';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

type UnifiedThemeContextValue = {
  /** The activeColorScheme for the docs ThemeProvider */
  docsColorScheme: ColorScheme;
  /** Set the activeColorScheme for the docs ThemeProvider */
  setDocsColorScheme: (scheme: ColorScheme) => void;
  /** The theme for the docs ThemeProvider */
  docsTheme: ThemeConfig;
  /** Set the theme for the docs ThemeProvider */
  setDocsTheme: (theme: ThemeConfig) => void;
  /** The activeColorScheme for the code playground ThemeProvider */
  playgroundColorScheme: ColorScheme;
  /** Set the activeColorScheme for the code playground ThemeProvider */
  setPlaygroundColorScheme: (scheme: ColorScheme) => void;
  /** The theme for the code playground ThemeProvider */
  playgroundTheme: ThemeConfig;
  /** Set the theme for the code playground ThemeProvider */
  setPlaygroundTheme: (theme: ThemeConfig) => void;
  /** Set the activeColorScheme for both the docs ThemeProvider and the code playground ThemeProvider */
  setUnifiedColorScheme: (scheme: ColorScheme) => void;
};

const UnifiedThemeContext = createContext<UnifiedThemeContextValue | undefined>(undefined);

export const useUnifiedTheme = () => {
  const context = useContext(UnifiedThemeContext);
  if (!context) throw Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
  return context;
};

export const useDocsTheme = () => {
  const { docsColorScheme, setDocsColorScheme, docsTheme, setDocsTheme } = useUnifiedTheme();
  return {
    colorScheme: docsColorScheme,
    setColorScheme: setDocsColorScheme,
    theme: docsTheme,
    setTheme: setDocsTheme,
  };
};

export const usePlaygroundTheme = () => {
  const { playgroundColorScheme, setPlaygroundColorScheme, playgroundTheme, setPlaygroundTheme } =
    useUnifiedTheme();
  return {
    colorScheme: playgroundColorScheme,
    setColorScheme: setPlaygroundColorScheme,
    theme: playgroundTheme,
    setTheme: setPlaygroundTheme,
  };
};

type UnifiedThemeProviderProps = {
  children: React.ReactNode;
  initialDocsTheme?: ThemeConfig;
  initialPlaygroundTheme?: ThemeConfig;
};

const colorSchemeStorageKey = 'cdsColorScheme';

export const UnifiedThemeProvider = ({
  children,
  initialDocsTheme = docsTheme,
  initialPlaygroundTheme = defaultTheme,
}: UnifiedThemeProviderProps) => {
  const { setColorMode } = useColorMode();
  const [docsColorScheme, setDocsColorScheme] = useState<ColorScheme>('dark');
  const [docsTheme, setDocsTheme] = useState(initialDocsTheme);
  const [playgroundColorScheme, setPlaygroundColorScheme] = useState<ColorScheme>(docsColorScheme);
  const [playgroundTheme, setPlaygroundTheme] = useState<ThemeConfig>(initialPlaygroundTheme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const hasMounted = useHasMounted();

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
      docsTheme,
      setDocsTheme,
      playgroundColorScheme,
      setPlaygroundColorScheme,
      playgroundTheme,
      setPlaygroundTheme,
      setUnifiedColorScheme: updateUnifiedColorScheme,
    }),
    [
      docsColorScheme,
      updateDocsColorScheme,
      docsTheme,
      playgroundColorScheme,
      playgroundTheme,
      updateUnifiedColorScheme,
    ],
  );

  return <UnifiedThemeContext.Provider value={api}>{children}</UnifiedThemeContext.Provider>;
};
