import type { PaletteAliasToRgbaString } from '../types';
import { baseTheme, frontierTheme } from '../themes';
import { paletteValueToRgbaString } from './paletteValueToRgbaString';

/**
 * Given a palette alias, such as foregroundMuted, and the spectrum, it will output the rgba value
 * @param paletteAlias - foregroundMuted, foreground, background etc...
 * @param spectrum - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgba string - rgba(255, 255, 255, 1)
 */
export const paletteAliasToRgbaString: PaletteAliasToRgbaString = (
  alias,
  spectrum,
  hasFrontier,
) => {
  const theme = hasFrontier ? frontierTheme : baseTheme;
  const palette = spectrum === 'light' ? theme.light.palette : theme.dark.palette;
  const paletteValue = palette[alias];
  return paletteValueToRgbaString(paletteValue, spectrum, hasFrontier);
};
