import { spectrumConfigs } from '../spectrum/spectrumConfigs';
import type { PaletteValue, RgbaArray, Spectrum } from '../types';
import { memoize } from '../utils/memoize';

import { paletteValueToCacheName } from './paletteValueToCacheName';
import { paletteValueToTuple } from './paletteValueToTuple';

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - gray0, etc...
 * @param spectrum: Spectrum - dark or light
 * @returns rgbaArray - [255, 255, 255, 1]
 */
export const paletteValueToRgbaArray = memoize(
  (paletteValue: PaletteValue, spectrum: Spectrum): RgbaArray => {
    const [alias, opacity] = paletteValueToTuple(paletteValue);
    const spectrumConfig = spectrumConfigs.base[spectrum];
    const [red, green, blue] = spectrumConfig[alias];
    return [red, green, blue, opacity];
  },
  paletteValueToCacheName,
);
