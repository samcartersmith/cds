import React, { type ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { docsTheme } from '@site/src/constants';
import type { ThemeConfig } from '@cbhq/cds-web2/core/theme';

type UnifiedThemeContextValue = {
  // Docs theme values
  docsColorScheme: 'light' | 'dark';
  setDocsColorScheme: (scheme: 'light' | 'dark') => void;
  docsTheme: ThemeConfig;
  setDocsTheme: (theme: ThemeConfig) => void;
  // Playground theme values
  playgroundColorScheme: 'light' | 'dark';
  setPlaygroundColorScheme: (scheme: 'light' | 'dark') => void;
  playgroundTheme: ThemeConfig;
  setPlaygroundTheme: (theme: ThemeConfig) => void;
};

const UnifiedThemeContext = createContext<UnifiedThemeContextValue | undefined>(undefined);

export const useUnifiedTheme = () => {
  const context = useContext(UnifiedThemeContext);
  if (!context) {
    throw new Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
  }
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
  children: ReactNode;
  initialDocsTheme?: ThemeConfig;
  initialPlaygroundTheme?: ThemeConfig;
};

export const UnifiedThemeProvider = ({
  children,
  initialDocsTheme = docsTheme,
  initialPlaygroundTheme = docsTheme,
}: UnifiedThemeProviderProps) => {
  const { colorMode: docsColorMode, setColorMode: setDocsColorMode } = useColorMode();
  const [docsThemeState, setDocsThemeState] = useState(initialDocsTheme);

  const [playgroundColorMode, setPlaygroundColorMode] = useState<'light' | 'dark'>(docsColorMode);
  const [playgroundThemeState, setPlaygroundThemeState] = useState(initialPlaygroundTheme);

  const api = useMemo(
    () =>
      ({
        // Docs theme values
        docsColorScheme: docsColorMode === 'dark' ? 'dark' : 'light',
        setDocsColorScheme: setDocsColorMode,
        docsTheme: docsThemeState,
        setDocsTheme: setDocsThemeState,
        // Playground theme values
        playgroundColorScheme: playgroundColorMode === 'dark' ? 'dark' : 'light',
        setPlaygroundColorScheme: (scheme: 'light' | 'dark') =>
          setPlaygroundColorMode(scheme === 'dark' ? 'dark' : 'light'),
        playgroundTheme: playgroundThemeState,
        setPlaygroundTheme: setPlaygroundThemeState,
      } satisfies UnifiedThemeContextValue),
    [docsColorMode, setDocsColorMode, docsThemeState, playgroundColorMode, playgroundThemeState],
  );

  return <UnifiedThemeContext.Provider value={api}>{children}</UnifiedThemeContext.Provider>;
};
