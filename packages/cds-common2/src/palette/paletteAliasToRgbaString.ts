import type { PaletteAliasToRgbaString } from '../types';

import { darkDefaultPalette, defaultPalette } from './constants';
import { paletteValueToRgbaString } from './paletteValueToRgbaString';

/**
 * Given a palette alias, such as foregroundMuted, and the spectrum, it will output the rgba value
 * @param paletteAlias - foregroundMuted, foreground, background etc...
 * @param spectrum - light or dark
 * @returns rgba string - rgba(255, 255, 255, 1)
 */
export const paletteAliasToRgbaString: PaletteAliasToRgbaString = (alias, spectrum) => {
  const paletteConfig = {
    light: defaultPalette,
    dark: darkDefaultPalette,
  };
  const palette = spectrum === 'light' ? paletteConfig.light : paletteConfig.dark;
  const paletteValue = palette[alias];
  return paletteValueToRgbaString(paletteValue, spectrum);
};
