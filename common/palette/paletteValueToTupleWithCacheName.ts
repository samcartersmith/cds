import type { PaletteFn, PaletteValue, PaletteValueTuple } from '../types';
import { paletteValueToTuple } from './paletteValueToTuple';
import { paletteValueTupleToCacheName } from './paletteValueTupleToCacheName';

export type PaletteValueTupleWithCacheName = [PaletteValueTuple, string];

/**
 * Takes a palette value and returns tuple with paletteValueTuple and cacheName
 * @param paletteValue - 'blue60'
 * @param spectrum - dark
 * @param hasFrontier - true
 * @returns PaletteValueTupleWithCacheName - [ ['blue60', 1], 'blue60-1-dark-frontier']
 */
export const paletteValueToTupleWithCacheName: PaletteFn<
  PaletteValue,
  PaletteValueTupleWithCacheName
> = (paletteValue, spectrum, hasFrontier) => {
  const paletteValueTuple = paletteValueToTuple(paletteValue);
  const cacheName = paletteValueTupleToCacheName(paletteValueTuple, spectrum, hasFrontier);
  return [paletteValueTuple, cacheName];
};
