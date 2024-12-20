import type { PaletteValue, SpectrumHueStep } from '../types';

import { paletteValueToHueStepTuple } from './paletteValueToHueStepTuple';

/**
 * Takes a paletteValue and extracts the hue step for the associated spectrum color.
 * @param paletteValue - 'blue60' | ['blue60', 0.4]
 * @returns number - 60
 */
export const paletteValueToHueStep = (paletteValue: PaletteValue): SpectrumHueStep => {
  const [, step] = paletteValueToHueStepTuple(paletteValue);
  return step;
};
