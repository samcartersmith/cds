import type { PaletteFn, PaletteValueTuple } from '../types';

/**
 * Normalize palette value, spectrum and hasFrontier to cacheName string
 * @param paletteValue - ['blue60', 0.4]
 * @param spectrum - dark
 * @param hasFrontier - true
 * @returns string - 'blue60-0.4-dark-frontier'
 */
export const paletteValueTupleToCacheName: PaletteFn<PaletteValueTuple, string> = (
  [alias, opacity],
  spectrum,
  hasFrontier,
) => {
  return `${alias}-${opacity}-${spectrum}${hasFrontier ? '-frontier' : ''}`;
};
