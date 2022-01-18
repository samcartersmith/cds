import type { PaletteAliasToRgbaString } from '../types';
import { themeBase } from '../themes/themeBase';
import { themeFrontier } from '../themes/themeFrontier';
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
  const theme = hasFrontier ? themeFrontier : themeBase;
  const palette = spectrum === 'light' ? theme.light.palette : theme.dark.palette;
  const paletteValue = palette[alias];
  return paletteValueToRgbaString(paletteValue, spectrum, hasFrontier);
};
