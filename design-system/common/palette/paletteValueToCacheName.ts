import type { PaletteFn, PaletteValue } from '../types';

/**
 * Takes a palette value and returns tuple with paletteValueTuple and cacheName
 * @param paletteValue - 'blue60'
 * @param spectrum - dark
 * @param hasFrontier - true
 * @returns cacheName - 'blue60-1-dark-frontier'
 */
export const paletteValueToCacheName: PaletteFn<PaletteValue, string> = (
  paletteValue,
  spectrum,
  hasFrontier,
) => {
  let cacheName: string;
  if (typeof paletteValue === 'string') {
    cacheName = `${paletteValue}-1`;
  } else {
    const [alias, opacity] = paletteValue;
    cacheName = `${alias}-${opacity}`;
  }
  return `${cacheName}-${spectrum}${hasFrontier ? '-frontier' : ''}`;
};
