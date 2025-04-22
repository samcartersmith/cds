import { createCssVars } from './createCssVars';
import { styleVarPrefixes, type Theme } from './theme';

/** Takes a theme object and formats it as CSS variables. */
export const createThemeCssVars = (theme: Partial<Theme>) => {
  const themeCss: Record<string, unknown> = {};
  for (const key in theme) {
    const themeKey = key as keyof Theme;
    if (!theme[themeKey]) continue;
    if (themeKey === 'activeColorScheme') {
      themeCss['--activeColorScheme'] = theme[themeKey];
      continue;
    }
    const cssVars = createCssVars(theme[themeKey], styleVarPrefixes[themeKey]);
    for (const cssVarName in cssVars) {
      // Escape periods in CSS Variable names
      const escapedVarName = cssVarName.replaceAll('.', '\\.');
      themeCss[escapedVarName] = cssVars[cssVarName as keyof typeof cssVars];
    }
  }
  return themeCss;
};
