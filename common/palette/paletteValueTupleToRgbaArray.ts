import { spectrumConfigs } from '../spectrum/spectrumConfigs';
import type { PaletteFn, PaletteValueTuple, RgbaArray } from '../types';
/**
 * Takes a palette value tuple and returns the rgba string
 * @param paletteValue - [gray0, 0.3]
 * @param spectrum  - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgb array - [255, 255, 255, 0.3]
 */
export const paletteValueTupleToRgbaArray: PaletteFn<PaletteValueTuple, RgbaArray> = (
  [alias, opacity],
  spectrum,
  hasFrontier,
) => {
  const spectrumConfig = hasFrontier ? spectrumConfigs.frontier : spectrumConfigs.base;
  const colors = spectrum === 'light' ? spectrumConfig.light : spectrumConfig.dark;
  const [red, green, blue] = colors[alias];
  return [red, green, blue, opacity];
};
