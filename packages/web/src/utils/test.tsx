import React from 'react';
import { waitFor, waitForOptions } from '@testing-library/react';
import { ColorScheme } from '@cbhq/cds-common/core/theme';

import { ThemeConfig } from '../core/theme';
import { ThemeProvider } from '../system/ThemeProvider';
import { defaultTheme } from '../themes/defaultTheme';

type DefaultThemeProviderProps = {
  children?: React.ReactNode;
  theme?: ThemeConfig;
  activeColorScheme?: ColorScheme;
};

export const DefaultThemeProvider = ({
  children,
  theme = defaultTheme,
  activeColorScheme = 'light',
}: DefaultThemeProviderProps): React.ReactElement => (
  <ThemeProvider activeColorScheme={activeColorScheme} theme={theme}>
    {children}
  </ThemeProvider>
);

// Test util that allows for us to test that an async thing does NOT occur within a timeframe
export async function waitForNotToHappen<T>(callback: () => Promise<T> | T, opts?: waitForOptions) {
  return expect(waitFor(callback, { ...opts, timeout: opts?.timeout ?? 100 })).rejects.toThrow();
}
