import { spectrumConfigs } from '../spectrum/spectrumConfigs';
import type { PaletteValue, Spectrum } from '../types';
import { memoize } from '../utils/memoize';

import { paletteValueToCacheName } from './paletteValueToCacheName';
import { paletteValueToTuple } from './paletteValueToTuple';

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette value and returns the rgba string
 * @param paletteValue - gray0
 * @param spectrum  - light or dark
 * @returns rgba string - rgba(255,255,255,1)
 */
export const paletteValueToRgbaString = memoize(
  (paletteValue: PaletteValue, spectrum: Spectrum) => {
    const [alias, opacity] = paletteValueToTuple(paletteValue);
    const spectrumConfig = spectrumConfigs.base[spectrum];
    const [red, green, blue] = spectrumConfig[alias];
    return `rgba(${red},${green},${blue},${opacity})`;
  },
  paletteValueToCacheName,
);
