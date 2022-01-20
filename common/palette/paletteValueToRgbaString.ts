import memoize from 'lodash/memoize';
import { spectrumConfigs } from '../spectrum/spectrumConfigs';
import type { PaletteValue, Spectrum } from '../types';
import { paletteValueToCacheName } from './paletteValueToCacheName';
import { paletteValueToTuple } from './paletteValueToTuple';

export const rgbaStringsCache: Record<string, string> = {};

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette value and returns the rgba string
 * @param paletteValue - gray0
 * @param spectrum  - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgba string - rgba(255,255,255,1)
 */
export const paletteValueToRgbaString = memoize(
  (paletteValue: PaletteValue, spectrum: Spectrum, hasFrontier?: boolean) => {
    const [alias, opacity] = paletteValueToTuple(paletteValue);
    const spectrumConfig = hasFrontier ? spectrumConfigs.frontier : spectrumConfigs.base;
    const colors = spectrum === 'light' ? spectrumConfig.light : spectrumConfig.dark;
    const [red, green, blue] = colors[alias];
    return `rgba(${red},${green},${blue},${opacity})`;
  },
  paletteValueToCacheName,
);
