import { mapKeys, mapValues, toCssVar } from '@cbhq/cds-utils';

import * as spectrumModes from '../configs/spectrum';
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
  'teal',
] as const;

export const hueSteps = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

export const spectrumRgbStringMap = mapValues(spectrumModes, (_, mode) =>
  createSpectrum(mode, 'rgbString'),
);
export const spectrumRgbArrayMap = mapValues(spectrumModes, (_, mode) =>
  createSpectrum(mode, 'rgbArray'),
);

const modes = ['dark', 'light'];

export const Spectrum = {
  css: mapValues(spectrumRgbStringMap, (_, spectrum) =>
    mapKeys(spectrumRgbStringMap[spectrum], (_2, key) => toCssVar(key)),
  ),
  native: spectrumRgbArrayMap,
  hueSteps,
  hueNames,
  modes,
};

export const RootSpectrumPreference = modes.concat('system');
