import memoize from 'lodash/memoize';
import { colorToHex } from '../color/colorToHex';
import type { PaletteValueToHex } from '../types';
import { paletteValueToRgbaArray } from './paletteValueToRgbaArray';
import { paletteValueToCacheName } from './paletteValueToCacheName';

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns hex value based on color and spectrum
 */
export const paletteValueToHex: PaletteValueToHex = memoize(
  (paletteValue, spectrum, hasFrontier) => {
    const [red, green, blue] = paletteValueToRgbaArray(paletteValue, spectrum, hasFrontier);
    return colorToHex(`rgb(${red},${green},${blue})`);
  },
  paletteValueToCacheName,
);
