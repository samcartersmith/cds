import type { PaletteValueToRgbaString } from '../types';
import { paletteValueTupleToRgbaString } from './paletteValueTupleToRgbaString';
import { paletteValueToTupleWithCacheName } from './paletteValueToTupleWithCacheName';

export const rgbaStringsCache: Record<string, string> = {};

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette value and returns the rgba string
 * @param paletteValue - gray0
 * @param spectrum  - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgba string - rgba(255,255,255,1)
 */
export const paletteValueToRgbaString: PaletteValueToRgbaString = (
  paletteValue,
  spectrum,
  hasFrontier,
) => {
  const [paletteValueTuple, cacheName] = paletteValueToTupleWithCacheName(
    paletteValue,
    spectrum,
    hasFrontier,
  );
  if (cacheName in rgbaStringsCache) {
    return rgbaStringsCache[cacheName];
  }
  const rgbaString = paletteValueTupleToRgbaString(paletteValueTuple, spectrum, hasFrontier);
  rgbaStringsCache[cacheName] = rgbaString;
  return rgbaString;
};
