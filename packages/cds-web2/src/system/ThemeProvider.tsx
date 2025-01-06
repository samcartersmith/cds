import React, { createContext, useContext, useId, useMemo } from 'react';

import { createCssString } from '../core/createCssString';
import { createThemeCssVars } from '../core/createThemeCssVars';
import type { ThemeConfig, ThemeCSSVars } from '../core/theme';

/* Augments csstype's Properties by adding all our theme CSS variable names. Effectively adds all theme CSS variable names as valid keys to React.CSSProperties. */
declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  interface Properties extends Partial<ThemeCSSVars> {}
}

export const ThemeContext = createContext<ThemeConfig | undefined>(undefined);

export const useTheme = (): ThemeConfig => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('useTheme must be used within a ThemeProvider');
  return context;
};

type ThemeManagerProps = {
  display?: React.CSSProperties['display'];
  children?: React.ReactNode;
};

export const useThemeProviderStyles = () => {
  const id = useId();
  const theme = useTheme();
  return useMemo(() => {
    const className = `cds-theme-${id.replaceAll(':', '')}`;
    const themeCssVars = createThemeCssVars(theme);
    const css = createCssString(themeCssVars);
    return { className, css };
  }, [id, theme]);
};

const ThemeManager = ({ display, children }: ThemeManagerProps) => {
  const { className, css } = useThemeProviderStyles();
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

export type ThemeProviderProps = ThemeManagerProps & {
  theme: ThemeConfig;
  children?: React.ReactNode;
};

export const ThemeProvider = ({ theme, children, display }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeManager display={display}>{children}</ThemeManager>
    </ThemeContext.Provider>
  );
};
