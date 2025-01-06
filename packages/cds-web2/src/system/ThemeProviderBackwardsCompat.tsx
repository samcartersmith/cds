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

const backwardsCompatBase = `
    --cds-font-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    --cds-font-display: CoinbaseDisplay, var(--cds-font-fallback);
    --cds-font-sans: CoinbaseSans, var(--cds-font-fallback);
    --cds-font-text: CoinbaseText, var(--cds-font-fallback);
    --cds-font-mono: CoinbaseMono, var(--cds-font-fallback);
    --border-radius-rounded-none: 0px;
    --border-radius-rounded-small: 4px;
    --border-radius-rounded: 8px;
    --border-radius-rounded-medium: 12px;
    --border-radius-rounded-large: 16px;
    --border-radius-rounded-x-large: 24px;
    --border-radius-rounded-full: 1000px;
    --border-width-none: 0px;
    --border-width-button: 1px;
    --border-width-card: 1px;
    --border-width-checkbox: 2px;
    --border-width-radio: 2px;
    --border-width-sparkline: 2px;
    --border-width-focus-ring: 2px;
    --border-width-input: 1px;
`;

const backwardsCompatScale = `
    --display1-font-weight: 400;
    --display1-font-family: var(--cds-font-display);
    --display2-font-weight: 400;
    --display2-font-family: var(--cds-font-display);
    --display3-font-weight: 400;
    --display3-font-family: var(--cds-font-display);
    --title1-font-weight: 600;
    --title1-font-family: var(--cds-font-display);
    --title2-font-weight: 400;
    --title2-font-family: var(--cds-font-display);
    --title3-font-weight: 600;
    --title4-font-weight: 400;
    --headline-font-weight: 600;
    --headline-font-family: var(--cds-font-sans);
    --body-font-weight: 400;
    --body-font-family: var(--cds-font-sans);
    --label1-font-weight: 600;
    --label2-font-weight: 400;
    --caption-font-weight: 600;
    --legal-font-weight: 400;
    --spacing-0: 0px;
    --spacing-0\\.5: 4px;
    --spacing-1: 8px;
    --label1-font-family: var(--cds-font-sans);
    --label2-font-family: var(--cds-font-sans);
    --spacing-1\\.5: 12px;
    --spacing-2: 16px;
    --spacing-3: 24px;
    --spacing-4: 32px;
    --spacing-5: 40px;
    --spacing-6: 48px;
    --spacing-7: 56px;
    --spacing-8: 64px;
    --spacing-9: 72px;
    --spacing-10: 80px;
    --checkbox-size: 20px;
    --radio-size: 20px;
    --switch-width: 52px;
    --switch-height: 32px;
    --switch-thumb-size: 30px;
    --display1-font-size: 64px;
    --display1-line-height: 72px;
    --display2-font-size: 48px;
    --display2-line-height: 56px;
    --display3-font-size: 40px;
    --display3-line-height: 48px;
    --title1-font-size: 28px;
    --title1-line-height: 36px;
    --title2-font-size: 28px;
    --title2-line-height: 36px;
    --title3-font-size: 20px;
    --title3-line-height: 28px;
    --title3-font-family: var(--cds-font-sans);
    --title4-font-size: 20px;
    --title4-line-height: 28px;
    --title4-font-family: var(--cds-font-sans);
    --headline-font-size: 16px;
    --headline-line-height: 24px;
    --body-font-size: 16px;
    --body-line-height: 24px;
    --label1-font-size: 14px;
    --label1-line-height: 20px;
    --label2-font-size: 14px;
    --label2-line-height: 20px;
    --caption-font-size: 13px;
    --caption-line-height: 16px;
    --caption-font-family: var(--cds-font-text);
    --legal-font-size: 13px;
    --legal-line-height: 16px;
    --legal-font-family: var(--cds-font-text);
`;

const backwardsCompatColorSchemes = {
  light: `
    --foreground: rgb(var(--gray100));
    --foreground-muted: rgb(var(--gray60));
    --background: rgb(var(--gray0));
    --background-alternate: rgb(var(--gray5));
    --background-inverse: rgb(var(--gray100));
    --background-overlay: rgba(var(--gray80),0.33);
    --line: rgba(var(--gray60),0.2);
    --line-heavy: rgba(var(--gray60),0.66);
    --primary: rgb(var(--blue60));
    --primary-wash: rgb(var(--blue0));
    --primary-foreground: rgb(var(--gray0));
    --negative: rgb(var(--red60));
    --negative-foreground: rgb(var(--gray0));
    --negative-wash: rgb(var(--red0));
    --positive: rgb(var(--green60));
    --positive-foreground: rgb(var(--gray0));
    --secondary: rgb(var(--gray5));
    --secondary-foreground: rgb(var(--gray100));
    --transparent: rgba(var(--gray0),0);
    --warning: rgb(var(--yellow50));
    --warning-foreground: rgb(var(--orange40));
  `,
  dark: `
    --foreground: rgb(var(--gray100));
    --foreground-muted: rgb(var(--gray60));
    --background: rgb(var(--gray0));
    --background-alternate: rgb(var(--gray5));
    --background-inverse: rgb(var(--gray100));
    --background-overlay: rgba(var(--gray80),0.33);
    --line: rgba(var(--gray60),0.2);
    --line-heavy: rgba(var(--gray60),0.66);
    --primary: rgb(var(--blue70));
    --primary-wash: rgb(var(--blue0));
    --primary-foreground: rgb(var(--gray0));
    --negative: rgb(var(--red60));
    --negative-foreground: rgb(var(--gray0));
    --negative-wash: rgb(var(--red0));
    --positive: rgb(var(--green60));
    --positive-foreground: rgb(var(--gray0));
    --secondary: rgb(var(--gray20));
    --secondary-foreground: rgb(var(--gray100));
    --transparent: rgba(var(--gray0),0);
    --warning: rgb(var(--yellow50));
    --warning-foreground: rgb(var(--orange70));
  `,
};

export const useThemeProviderStyles = () => {
  const theme = useTheme();
  const themeCssVars = createThemeCssVars(theme);
  const colorScheme = theme.metadata?.colorScheme ?? 'light';
  const themeCss = createCssString(themeCssVars);
  const backwardsCompatThemeCss = useMemo(
    () =>
      `${themeCss}${backwardsCompatBase}${backwardsCompatScale}${backwardsCompatColorSchemes[colorScheme]}`,
    [themeCss, colorScheme],
  );
  const className = `cds-theme-${useId().replaceAll(':', '')}`;
  return { className, css: backwardsCompatThemeCss };
};

const ThemeManager = ({ display, children }: ThemeManagerProps) => {
  const { className, css } = useThemeProviderStyles();
  const style = useMemo(() => ({ display }), [display]);
  const themeCssElement = useMemo(
    () => <style type="text/css">{`.${className}{${css}}`}</style>,
    [className, css],
  );
  return (
    <div className={className} style={style}>
      {themeCssElement}
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
