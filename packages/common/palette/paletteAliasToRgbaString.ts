import type { PaletteAliasToRgbaString } from '../types';

import { defaultPalette, frontierSpectrumPalette } from './constants';
import { paletteValueToRgbaString } from './paletteValueToRgbaString';

const frontierLight = { ...defaultPalette, ...frontierSpectrumPalette.light } as const;
const frontierDark = { ...defaultPalette, ...frontierSpectrumPalette.dark } as const;

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
  const paletteConfig = {
    light: hasFrontier ? frontierLight : defaultPalette,
    dark: hasFrontier ? frontierDark : defaultPalette,
  };
  const palette = spectrum === 'light' ? paletteConfig.light : paletteConfig.dark;
  const paletteValue = palette[alias];
  return paletteValueToRgbaString(paletteValue, spectrum, hasFrontier);
};
