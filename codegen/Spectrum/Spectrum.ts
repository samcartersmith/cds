import * as spectrumModes from '@cb/design-system/codegen/configs/spectrum';
import { mapKeys, mapValues, toCssVar } from '@cb/design-system/utils';

import { createSpectrum } from './createSpectrum';

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
};
