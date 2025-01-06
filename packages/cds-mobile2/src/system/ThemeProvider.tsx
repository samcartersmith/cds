import React, { createContext, useContext } from 'react';

import type { ThemeConfig } from '../core/theme';

export const ThemeContext = createContext<ThemeConfig | undefined>(undefined);

export const useTheme = (): ThemeConfig => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('useTheme must be used within a ThemeProvider');
  return context;
};

export type ThemeProviderProps = {
  theme: ThemeConfig;
  children?: React.ReactNode;
};

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
