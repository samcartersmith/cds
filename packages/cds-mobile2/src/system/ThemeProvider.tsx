import React, { createContext, useContext, useMemo } from 'react';
import type { ColorScheme } from '@cbhq/cds-common2/core/theme';

import type { Theme, ThemeConfig } from '../core/theme';

export type ThemeContextValue = Theme;

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// export type ThemeProviderProps = SystemProviderProps &
//   ThemeManagerProps &
//   FramerMotionProviderProps;

export type ThemeProviderProps = {
  theme: ThemeConfig;
  activeColorScheme: ColorScheme;
  children?: React.ReactNode;
};

export const ThemeProvider = ({ theme, activeColorScheme, children }: ThemeProviderProps) => {
  const themeApi = useMemo(() => {
    const activeSpectrumKey = activeColorScheme === 'dark' ? 'darkSpectrum' : 'lightSpectrum';
    const inverseSpectrumKey = activeColorScheme === 'dark' ? 'lightSpectrum' : 'darkSpectrum';
    const inverseColorScheme = activeColorScheme === 'dark' ? 'light' : 'dark';

    // TO DO: Link to color / theme docs in these error messages
    if (!theme[activeColorScheme])
      throw Error(
        `ThemeProvider activeColorScheme is ${activeColorScheme} but no ${activeColorScheme} colors are defined for the theme`,
      );

    if (!theme[activeSpectrumKey])
      throw Error(
        `ThemeProvider activeColorScheme is ${activeColorScheme} but no ${activeSpectrumKey} values are defined for the theme`,
      );

    if (theme[inverseSpectrumKey] && !theme[inverseColorScheme])
      throw Error(
        `ThemeProvider theme has ${inverseSpectrumKey} values defined but no ${inverseColorScheme} colors are defined for the theme`,
      );

    if (theme[inverseColorScheme] && !theme[inverseSpectrumKey])
      throw Error(
        `ThemeProvider theme has ${inverseColorScheme} colors defined but no ${inverseSpectrumKey} values are defined for the theme`,
      );

    return {
      ...theme,
      colorScheme: activeColorScheme,
      spectrum: theme[activeSpectrumKey],
      color: theme[activeColorScheme],
    };
  }, [theme, activeColorScheme]);

  return <ThemeContext.Provider value={themeApi}>{children}</ThemeContext.Provider>;
};

export type InvertedThemeProviderProps = {
  children?: React.ReactNode;
};

/** Falls back to the currently active colorScheme if the inverse colors are not defined in the theme.  */
export const InvertedThemeProvider = ({ children }: InvertedThemeProviderProps) => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('InvertedThemeProvider must be used within a ThemeProvider');
  const inverseColorScheme = context.colorScheme === 'dark' ? 'light' : 'dark';
  const newColorScheme = context[inverseColorScheme] ? inverseColorScheme : context.colorScheme;

  return (
    <ThemeProvider activeColorScheme={newColorScheme} theme={context}>
      {children}
    </ThemeProvider>
  );
};
