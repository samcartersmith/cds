/* eslint-disable */
import { type CSSProperties } from '@linaria/core';
import { type Theme, type ThemeConfig, varNames, styleVarPrefixes } from './theme';
import { createCssVars } from './createCssVars';

export const createThemeCssVars = (theme: ThemeConfig) => {
  const themeCss: Record<string, CSSProperties> = {};
  for (const key in theme) {
    // If the key is a VarType / Theme key, create CSS Variables for it
    if (key in varNames) {
      const themeKey = key as keyof typeof varNames;
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
    // Otherwise it must be a media query, so recurse
    else themeCss[key] = createThemeCssVars(theme[key as `@media ${string}`]);
  }
  return themeCss;
};
