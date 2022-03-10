import { spectrumConfigs } from '../spectrum/spectrumConfigs';
import type { PaletteValue, RgbaArray, Spectrum } from '../types';
import { memoize } from '../utils/memoize';

import { paletteValueToCacheName } from './paletteValueToCacheName';
import { paletteValueToTuple } from './paletteValueToTuple';

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - gray0, etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgbaArray - [255, 255, 255, 1]
 */
export const paletteValueToRgbaArray = memoize(
  (paletteValue: PaletteValue, spectrum: Spectrum, hasFrontier?: boolean): RgbaArray => {
    const [alias, opacity] = paletteValueToTuple(paletteValue);
    const spectrumConfig = hasFrontier ? spectrumConfigs.frontier : spectrumConfigs.base;
    const colors = spectrum === 'light' ? spectrumConfig.light : spectrumConfig.dark;
    const [red, green, blue] = colors[alias];
    return [red, green, blue, opacity];
  },
  paletteValueToCacheName,
);
