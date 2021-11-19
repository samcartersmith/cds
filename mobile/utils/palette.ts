import {
  defaultPalette,
  PaletteAliasToRgbaString,
  PaletteConfigToRgbaStrings,
  PaletteValue,
  PaletteValueToHex,
  PaletteValueToRgbaArray,
  PaletteValueToRgbaString,
  Spectrum,
} from '@cbhq/cds-common';
import { colorToHex } from '@cbhq/cds-common/color/colorToHex';
import { getSpectrumConditional } from '@cbhq/cds-common/color/getSpectrumConditional';
import { paletteValueToTuple } from '@cbhq/cds-common/palette/paletteValueToTuple';
import { mapValues } from '@cbhq/cds-utils';

import { light, dark, frontierLight, frontierDark } from '../styles/spectrum';

const spectrumConfigs = {
  base: {
    light,
    dark,
  },
  frontier: {
    light: frontierLight,
    dark: frontierDark,
  },
};

function getSpectrumConfig(spectrum: Spectrum, hasFrontier?: boolean) {
  const baseConfig = getSpectrumConditional(spectrumConfigs.base, spectrum);
  const frontierConfig = getSpectrumConditional(spectrumConfigs.frontier, spectrum);
  return { ...baseConfig, ...(hasFrontier ? frontierConfig : {}) };
}

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette value and returns the rgba string
 * @param paletteValue - gray0
 * @param spectrum  - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgba string - rgba(255,255,255,1)
 */
export const paletteValueToRgbaString: PaletteValueToRgbaString = (paletteValue, ...args) => {
  const [alias, opacity] = paletteValueToTuple(paletteValue);
  const colors = getSpectrumConfig(...args);
  const spectrumValue = colors[alias];
  return `rgba(${[...spectrumValue, opacity].join(',')})`;
};

/**
 * Given a palette alias, such as foregroundMuted, and the spectrum, it will output the rgba value
 * @param palette - foregroundMuted, foreground, background etc...
 * @param spectrum - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgba string - rgba(255, 255, 255, 1)
 */
export const paletteAliasToRgbaString: PaletteAliasToRgbaString = (palette, ...args) => {
  return paletteValueToRgbaString(defaultPalette[palette] as PaletteValue, ...args);
};

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette config and returns an object to access computed color values based on config.
 * @param paletteConfig  - { background: 'gray0' }
 * @param spectrum - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns { background: 'rgb(255, 255, 255)' }
 */
export const paletteConfigToRgbaStrings: PaletteConfigToRgbaStrings = (paletteConfig, ...args) => {
  return mapValues({ ...defaultPalette, ...paletteConfig }, (paletteValue) =>
    paletteValueToRgbaString(paletteValue, ...args),
  );
};

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - blue0, blue10 etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns hex value based on color and spectrum
 */
export const paletteValueToHex: PaletteValueToHex = (color, ...args) =>
  colorToHex(paletteValueToRgbaString(color, ...args));

/**
 * Given a color that is a PaletteValue and the spectrum, output a hex value of this color
 * @param color: PaletteValue - gray0, etc...
 * @param spectrum: Spectrum - dark or light
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns rgbaArray - [255, 255, 255, 1]
 */
export const paletteValueToRgbaArray: PaletteValueToRgbaArray = (paletteValue, ...args) => {
  const [alias, opacity] = paletteValueToTuple(paletteValue);
  const colors = getSpectrumConfig(...args);
  const spectrumValue = colors[alias];
  return [...spectrumValue, opacity];
};
