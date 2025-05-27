import React from 'react';
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
