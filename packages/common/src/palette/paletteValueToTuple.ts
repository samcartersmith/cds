import type { PaletteValue, SpectrumAliasWithOpacity } from '../types';

/**
 * Normalize palette value to be a spectrum alias & opacity tuple
 * @param paletteValue - 'blue60' | ['blue60', 0.4]
 * @returns spectrum alias & opacity tuple - ['blue60', 1] | ['blue60', 0.4]
 */
export const paletteValueToTuple = (paletteValue: PaletteValue): SpectrumAliasWithOpacity => {
  if (typeof paletteValue === 'string') return [paletteValue, 1];
  if (Array.isArray(paletteValue)) return paletteValue;
  // This should never happen, but in the off chance we should return a valid tuple.
  return ['gray100', 1];
};
