import { memoize } from '../utils/memoize';
import { colorToHex } from '../color/colorToHex';
import type { PaletteValue, Spectrum } from '../types';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';
import { paletteValueToCacheName } from './paletteValueToCacheName';

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns hex value based on color and spectrum
 */
export const paletteValueToHex = memoize(
  (paletteValue: PaletteValue, spectrum: Spectrum, hasFrontier?: boolean) => {
    const [red, green, blue] = paletteValueToRgbaArray(paletteValue, spectrum, hasFrontier);
    return colorToHex(`rgb(${red},${green},${blue})`);
  },
  paletteValueToCacheName,
);
