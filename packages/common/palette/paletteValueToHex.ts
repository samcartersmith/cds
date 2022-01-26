import { colorToHex } from '../color/colorToHex';
import type { PaletteValueToHex } from '../types';

import { paletteValueToRgbaString } from './paletteValueToRgbaString';

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns hex value based on color and spectrum
 */
export const paletteValueToHex: PaletteValueToHex = (color, spectrum, hasFrontier) =>
  colorToHex(paletteValueToRgbaString(color, spectrum, hasFrontier));
