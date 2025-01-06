/* eslint-disable */
import { type CSSProperties } from '@linaria/core';
import { type Theme, type ThemeConfig, styleVarPrefixes } from './theme';
import { createCssVars } from './createCssVars';

export const createThemeCssVars = (theme: Partial<ThemeConfig>) => {
  const themeCss: Record<string, CSSProperties> = {};
  for (const key in theme) {
    if (key === 'metadata') continue;
    // It's a media query, so recurse
    if (key.charAt(0) === '@')
      themeCss[key] = createThemeCssVars(theme[key as `@media ${string}`] as Partial<Theme>);
    // Otherwise the key is a VarType / Theme key, create CSS Variables for it
    else {
      const themeKey = key as keyof Theme;
      const cssVars = createCssVars(
        (theme as Theme)[themeKey],
        styleVarPrefixes[themeKey as keyof typeof styleVarPrefixes] || '',
      );
      for (const cssVarName in cssVars) {
        // Escapes periods in CSS Variable names
        const escapedVarName = cssVarName.replaceAll('.', '\\.');
        themeCss[escapedVarName] = cssVars[cssVarName as keyof typeof cssVars];
      }
    }
  }
  return themeCss;
};
