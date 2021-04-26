import { defaultPalette, PaletteValue, PartialPaletteConfig, Spectrum } from '@cbhq/cds-common';
import { mapValues, rgba2hex } from '@cbhq/cds-utils';

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

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this
 * color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @returns hex value based on color and spectrum
 */
export const paletteToHex = (color: PaletteValue, spectrum: Spectrum) =>
  rgba2hex(getColorFromSpectrumAlias(color, spectrum));
