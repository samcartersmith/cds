import React, { createContext, useContext, useId, useMemo } from 'react';

import { createCssString } from '../core/createCssString';
import { createThemeCssVars } from '../core/createThemeCssVars';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type AllThemeCSSVarsUntyped, type ThemeConfig } from '../core/theme';

// // TO DO: If we do this we break strong typing for React.CSSProperties, everyone becomes type of any. To make this work correctly we should manually pull out the types from React.CSSProperties and use those instead of `any`
// declare module 'react' {
//   interface CSSProperties extends Partial<AllThemeCSSVarsUntyped> {}
// }

export const ThemeContext = createContext<ThemeConfig | undefined>(undefined);

export const useThemeContext = (): ThemeConfig => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('useThemeContext must be used within a ThemeProvider');
  return context;
};

type ThemeManagerProps = {
  display?: React.CSSProperties['display'];
  children?: React.ReactNode;
};

export const useThemeProviderStyles = () => {
  const theme = useThemeContext();
  const themeCssVars = createThemeCssVars(theme);
  const themeCss = createCssString(themeCssVars);
  const className = `cds-theme-${useId().replaceAll(':', '')}`;
  return { className, css: themeCss };
};

const ThemeManager = ({ display, children }: ThemeManagerProps) => {
  const { className, css } = useThemeProviderStyles();
  const style = useMemo(() => ({ display }), [display]);
  return (
    <div className={className} style={style}>
      <style type="text/css">{`.${className}{${css}}`}</style>
      {children}
    </div>
  );
};

// export type ThemeProviderProps = SystemProviderProps &
//   ThemeManagerProps &
//   FramerMotionProviderProps;

export type ThemeProviderProps = ThemeManagerProps & {
  theme?: ThemeConfig;
  children?: React.ReactNode;
};

export const ThemeProvider = ({ theme, children, display }: ThemeProviderProps) => {
  const value = useMemo(() => theme || ({} as ThemeConfig), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      <ThemeManager display={display}>{children}</ThemeManager>
    </ThemeContext.Provider>
  );
};
