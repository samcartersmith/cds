import { defaultPalette, PaletteValue, PartialPaletteConfig, Spectrum } from '@cds/common';
import { mapValues } from '@cds/utils';

import * as spectrumColors from '../styles/spectrum';

export const getColorFromSpectrumAlias = (spectrumAlias: PaletteValue, spectrum: Spectrum) => {
  const [alias, opacity] = typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
  const spectrumValue = spectrumColors[spectrum][alias];
  return typeof opacity === 'undefined'
    ? `rgb(${spectrumValue.join(',')})`
    : `rgba(${[...spectrumValue, opacity].join(',')})`;
};

export const convertPalette = (palette: PartialPaletteConfig, spectrum: Spectrum) => {
  return mapValues({ ...defaultPalette, ...palette }, spectrumAlias =>
    getColorFromSpectrumAlias(spectrumAlias, spectrum)
  );
};
