import type { PaletteValueToRgbaArray, RgbaArray } from '../types';
import { paletteValueToTupleWithCacheName } from './paletteValueToTupleWithCacheName';
import { paletteValueTupleToRgbaArray } from './paletteValueTupleToRgbaArray';

export const rgbaArraysCache: Record<string, RgbaArray> = {};

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - gray0, etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgbaArray - [255, 255, 255, 1]
 */
export const paletteValueToRgbaArray: PaletteValueToRgbaArray = (
  paletteValue,
  spectrum,
  hasFrontier,
) => {
  const [paletteValueTuple, cacheName] = paletteValueToTupleWithCacheName(
    paletteValue,
    spectrum,
    hasFrontier,
  );
  if (cacheName in rgbaArraysCache) {
    return rgbaArraysCache[cacheName];
  }
  const rgbaArray = paletteValueTupleToRgbaArray(paletteValueTuple, spectrum, hasFrontier);
  rgbaArraysCache[cacheName] = rgbaArray;
  return rgbaArray;
};
