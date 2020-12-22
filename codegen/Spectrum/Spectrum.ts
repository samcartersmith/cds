import * as spectrumModes from '@cb/design-system/codegen/configs/spectrum';
import { mapKeys, mapValues, toCssVar } from '@cb/design-system/utils';

import { createSpectrum } from './createSpectrum';

export const hueNames = [
  'blue',
  'green',
  'orange',
  'yellow',
  'gray',
  'indigo',
  'pink',
  'purple',
  'red',
] as const;

export const hueSteps = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

export const spectrumRgbStringMap = mapValues(spectrumModes, (_, mode) =>
  createSpectrum(mode, 'rgbString')
);
export const spectrumRgbArrayMap = mapValues(spectrumModes, (_, mode) =>
  createSpectrum(mode, 'rgbArray')
);

export const Spectrum = {
  css: mapValues(spectrumRgbStringMap, (_, spectrum) =>
    mapKeys(spectrumRgbStringMap[spectrum], (_, key) => toCssVar(key))
  ),
  native: spectrumRgbArrayMap,
  hueSteps,
  hueNames,
  modes: Object.keys(spectrumModes),
};
