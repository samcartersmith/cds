import React, { createContext, useContext, useId, useMemo } from 'react';
import type { ColorScheme } from '@cbhq/cds-common2/core/theme';

import { createCssString } from '../core/createCssString';
import { createThemeCssVars } from '../core/createThemeCssVars';
import type { Theme, ThemeConfig, ThemeCSSVars } from '../core/theme';

/* Augments csstype's Properties by adding all our theme CSS variable names. Effectively adds all theme CSS variable names as valid keys to React.CSSProperties. */
declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  interface Properties extends Partial<ThemeCSSVars> {}
}

export type ThemeContextValue = Theme;

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeManagerProps = {
  display?: React.CSSProperties['display'];
  children?: React.ReactNode;
  theme: Theme;
};

export const useThemeProviderStyles = (theme: Theme) => {
  const id = useId();
  return useMemo(() => {
    const className = `cds-theme-${id.replaceAll(':', '')}`;
    const themeCssVars = createThemeCssVars(theme);
    const css = createCssString(themeCssVars);
    return { className, css };
  }, [id, theme]);
};

const ThemeManager = ({ display, children, theme }: ThemeManagerProps) => {
  const { className, css } = useThemeProviderStyles(theme);
  const style = useMemo(() => ({ display }), [display]);
  const styleElement = useMemo(
    () => <style type="text/css">{`.${className}{${css}}`}</style>,
    [className, css],
  );
  return (
    <div className={className} style={style}>
      {styleElement}
      {children}
    </div>
  );
};

// export type ThemeProviderProps = SystemProviderProps &
//   ThemeManagerProps &
//   FramerMotionProviderProps;

export type ThemeProviderProps = Pick<ThemeManagerProps, 'display'> & {
  theme: ThemeConfig;
  activeColorScheme: ColorScheme;
  children?: React.ReactNode;
};

export const ThemeProvider = ({
  theme,
  activeColorScheme,
  children,
  display,
}: ThemeProviderProps) => {
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

  return (
    <ThemeContext.Provider value={themeApi}>
      <ThemeManager display={display} theme={themeApi}>
        {children}
      </ThemeManager>
    </ThemeContext.Provider>
  );
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
