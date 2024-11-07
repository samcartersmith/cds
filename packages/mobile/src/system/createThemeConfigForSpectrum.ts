import { darkDefaultPalette, defaultPalette } from '@cbhq/cds-common';
import { paletteConfigToInteractableTokens } from '@cbhq/cds-common/palette/paletteConfigToInteractableTokens';
import { paletteConfigToRgbaStrings } from '@cbhq/cds-common/palette/paletteConfigToRgbaStrings';
import {
  PaletteConfig,
  PartialPaletteConfig,
  Spectrum,
  ThemeConfig,
  ThemeConfigForSpectrum,
} from '@cbhq/cds-common/types';

import {
  CreateThemeConfigForSpectrumParams,
  NewPartialPaletteConfig,
  PartialPaletteConfigDark,
  PartialPaletteConfigLight,
} from './ThemeConfig';

const isLightConfig = (palette: NewPartialPaletteConfig): palette is PartialPaletteConfigLight => {
  if ('light' in palette) {
    return true;
  }
  return false;
};

const isDarkConfig = (palette: NewPartialPaletteConfig): palette is PartialPaletteConfigDark => {
  if ('dark' in palette) {
    return true;
  }
  return false;
};

const isNormalConfig = (palette: NewPartialPaletteConfig): palette is PartialPaletteConfig => {
  return !isLightConfig(palette) && !isDarkConfig(palette);
};

function getFallbackParentPalette(spectrum: Spectrum) {
  const fallbackLight = defaultPalette;
  const fallbackDark = darkDefaultPalette;
  return spectrum === 'light' ? fallbackLight : fallbackDark;
}

function getParentPalette(spectrum: Spectrum, parentThemeConfig?: ThemeConfig) {
  if (parentThemeConfig) {
    return spectrum === 'light' ? parentThemeConfig.light.palette : parentThemeConfig.dark.palette;
  }
  return getFallbackParentPalette(spectrum);
}

export const createThemeConfigForSpectrum = ({
  name,
  palette,
  parentThemeConfig,
  spectrum,
}: CreateThemeConfigForSpectrumParams): ThemeConfigForSpectrum => {
  const parentPalette: PaletteConfig = getParentPalette(spectrum, parentThemeConfig);
  const fallbackPalette = isNormalConfig(palette) ? palette : parentPalette;
  const lightPalette = isLightConfig(palette) ? palette.light : fallbackPalette;
  const darkPalette = isDarkConfig(palette) ? palette.dark : fallbackPalette;
  const finalPalette = spectrum === 'light' ? lightPalette : darkPalette;
  const mergedPalette = { ...parentPalette, ...finalPalette };

  return {
    palette: mergedPalette,
    rgbaStrings: paletteConfigToRgbaStrings(mergedPalette, spectrum),
    interactableTokens: paletteConfigToInteractableTokens({
      paletteConfig: mergedPalette,
      spectrum,
    }),
    name: `${name}-${spectrum}`,
  };
};
