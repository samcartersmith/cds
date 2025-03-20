import { type CSSProperties } from '@linaria/core';

import { createCssVars } from './createCssVars';
import { styleVarPrefixes, type Theme } from './theme';

export const createThemeCssVars = (theme: Partial<Theme>) => {
  const themeCss: Record<string, CSSProperties> = {};
  for (const key in theme) {
    const themeKey = key as keyof Theme;
    if (
      !theme[themeKey] ||
      themeKey === 'colorScheme' ||
      themeKey === 'lightSpectrum' ||
      themeKey === 'darkSpectrum' ||
      themeKey === 'light' ||
      themeKey === 'dark'
    )
      continue;
    const cssVars = createCssVars(theme[themeKey], styleVarPrefixes[themeKey] || '');
    for (const cssVarName in cssVars) {
      // Escapes periods in CSS Variable names
      const escapedVarName = cssVarName.replaceAll('.', '\\.');
      themeCss[escapedVarName] = cssVars[cssVarName as keyof typeof cssVars];
    }
  }
  return themeCss;
};
