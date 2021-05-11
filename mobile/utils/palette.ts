import {
  defaultPalette,
  PaletteValue,
  PaletteValueToRgbaArray,
  PaletteValueToRgbaString,
  PartialPaletteConfig,
  Spectrum,
} from '@cbhq/cds-common';
import { paletteValueToTuple, rgba2hex } from '@cbhq/cds-common/utils/color';
import { mapValues } from '@cbhq/cds-utils';

import * as spectrumColors from '../styles/spectrum';

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette config and returns an object to access computed color values based on config.
 * @param paletteConfig  - { background: 'gray0' }
 * @param spectrum - light or dark
 * @returns { background: 'rgb(255, 255, 255)' }
 */
export const paletteConfigToRgbaStrings = (
  paletteConfig: PartialPaletteConfig,
  spectrum: Spectrum
) => {
  return mapValues({ ...defaultPalette, ...paletteConfig }, paletteValue =>
    paletteValueToRgbaString(paletteValue, spectrum)
  );
};

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette value and returns the rgba string
 * @param paletteValue - gray0
 * @param spectrum  - light or dark
 * @returns rgba string - rgba(255,255,255,1)
 */
export const paletteValueToRgbaString: PaletteValueToRgbaString = (paletteValue, spectrum) => {
  const [alias, opacity] = paletteValueToTuple(paletteValue);
  const spectrumValue = spectrumColors[spectrum][alias];
  return `rgba(${[...spectrumValue, opacity].join(',')})`;
};

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @returns hex value based on color and spectrum
 */
export const paletteValueToHex = (color: PaletteValue, spectrum: Spectrum) =>
  rgba2hex(paletteValueToRgbaString(color, spectrum));

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - gray0, etc...
 * @param spectrum: Spectrum - dark or light
 * @returns rgbaArray - [255, 255, 255, 1]
 */
export const paletteValueToRgbaArray: PaletteValueToRgbaArray = (paletteValue, spectrum) => {
  const [alias, opacity] = paletteValueToTuple(paletteValue);
  const spectrumValue = spectrumColors[spectrum][alias];
  return [...spectrumValue, opacity];
};
