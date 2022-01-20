import { spectrumConfigs } from '../spectrum/spectrumConfigs';
import type { PaletteFn, PaletteValueTuple } from '../types';

/**
 * Takes a palette value tuple and returns the rgba string
 * @param paletteValue - [gray0, 0.3]
 * @param spectrum  - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgba string - rgba(255,255,255,1)
 */
export const paletteValueTupleToRgbaString: PaletteFn<PaletteValueTuple, string> = (
  [alias, opacity],
  spectrum,
  hasFrontier,
) => {
  const spectrumConfig = hasFrontier ? spectrumConfigs.frontier : spectrumConfigs.base;
  const colors = spectrum === 'light' ? spectrumConfig.light : spectrumConfig.dark;
  const [red, green, blue] = colors[alias];
  return `rgba(${red},${green},${blue},${opacity})`;
};
