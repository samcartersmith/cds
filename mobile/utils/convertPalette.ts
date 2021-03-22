import { defaultPalette, PaletteValue, PartialPaletteConfig, Spectrum } from '@cbhq/cds-common';
import { mapValues } from '@cbhq/cds-utils';

import * as spectrumColors from '../styles/spectrum';

export const getColorFromSpectrumAlias = (spectrumAlias: PaletteValue, spectrum: Spectrum) => {
  const [alias, opacity = 1] = typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
  const spectrumValue = spectrumColors[spectrum][alias];
  return `rgba(${[...spectrumValue, opacity].join(',')})`;
};

export const convertPalette = (palette: PartialPaletteConfig, spectrum: Spectrum) => {
  return mapValues({ ...defaultPalette, ...palette }, spectrumAlias =>
    getColorFromSpectrumAlias(spectrumAlias, spectrum)
  );
};
