import { colorToHex } from '../color/colorToHex';
import type { PaletteValueToHex } from '../types';
import { paletteValueTupleToRgbaArray } from './paletteValueTupleToRgbaArray';
import { paletteValueToTupleWithCacheName } from './paletteValueToTupleWithCacheName';

const cache: Record<string, string> = {};

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns hex value based on color and spectrum
 */
export const paletteValueToHex: PaletteValueToHex = (color, spectrum, hasFrontier) => {
  const [paletteValue, cacheName] = paletteValueToTupleWithCacheName(color, spectrum, hasFrontier);
  if (cacheName in cache) return cache[cacheName];
  // Transparent is converted to black hex. This fixes that.
  const [red, green, blue] = paletteValueTupleToRgbaArray(paletteValue, spectrum, hasFrontier);
  const hexValue = colorToHex(`rgb(${red},${green},${blue})`);
  cache[cacheName] = hexValue;
  return hexValue;
};
