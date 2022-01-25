import { dark, frontierDark, frontierLight, light } from '../spectrum/spectrumRgbArray';
import type { PaletteValueToRgbaString } from '../types';

import { paletteValueToTuple } from './paletteValueToTuple';

export const spectrumConfigs = {
  base: {
    light,
    dark,
  },
  frontier: {
    light: { ...light, ...frontierLight },
    dark: { ...dark, ...frontierDark },
  },
};

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
  const [alias, opacity] = paletteValueToTuple(paletteValue);
  const spectrumConfig = hasFrontier ? spectrumConfigs.frontier : spectrumConfigs.base;
  const colors = spectrum === 'light' ? spectrumConfig.light : spectrumConfig.dark;
  const [red, green, blue] = colors[alias];
  const rgbaString = `rgba(${red},${green},${blue},${opacity})`;
  return rgbaString;
};
