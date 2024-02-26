import { colorToHex } from '../color/colorToHex';
import type { PaletteValue, Spectrum } from '../types';
import { memoize } from '../utils/memoize';

import { paletteValueToCacheName } from './paletteValueToCacheName';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @returns hex value based on color and spectrum
 */
export const paletteValueToHex = memoize((paletteValue: PaletteValue, spectrum: Spectrum) => {
  const [red, green, blue] = paletteValueToRgbaArray(paletteValue, spectrum);
  return colorToHex(`rgb(${red},${green},${blue})`);
}, paletteValueToCacheName);
