import memoize from 'lodash/memoize';
import { PaletteConfig, PartialPaletteConfig, Spectrum } from '@cbhq/cds-common/types';
import { paletteConfigToRgbaStrings } from '@cbhq/cds-common/palette/paletteConfigToRgbaStrings';
import { paletteConfigToHexValues } from '@cbhq/cds-common/palette/paletteConfigToHexValues';
import { paletteConfigToInteractableTokens } from '@cbhq/cds-common/palette/paletteConfigToInteractableTokens';
import { defaultPalette, frontierSpectrumPalette } from '@cbhq/cds-common';
import {
  CreateThemeConfigForSpectrumParams,
  NewPartialPaletteConfig,
  PartialPaletteConfigLight,
  PartialPaletteConfigDark,
  ThemeConfig,
  ThemeConfigForSpectrum,
} from './ThemeConfig';

const frontierLight = { ...defaultPalette, ...frontierSpectrumPalette.light } as const;
const frontierDark = { ...defaultPalette, ...frontierSpectrumPalette.dark } as const;

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

function getFallbackParentPalette(spectrum: Spectrum, hasFrontier: boolean) {
  const fallbackLight = hasFrontier ? frontierLight : defaultPalette;
  const fallbackDark = hasFrontier ? frontierDark : defaultPalette;
  return spectrum === 'light' ? fallbackLight : fallbackDark;
}

function getParentPalette(
  spectrum: Spectrum,
  hasFrontier: boolean,
  parentThemeConfig?: ThemeConfig,
) {
  if (parentThemeConfig) {
    return spectrum === 'light' ? parentThemeConfig.light.palette : parentThemeConfig.dark.palette;
  }
  return getFallbackParentPalette(spectrum, hasFrontier);
}

export const getCacheKey = ({
  name,
  parentThemeConfig,
  hasFrontier = false,
  spectrum,
}: Omit<CreateThemeConfigForSpectrumParams, 'palette'>) => {
  const spectrumPrefix = `${spectrum}-mode`;
  const parentPrefix = parentThemeConfig ? `${parentThemeConfig.name}-` : '';
  const frontierSuffix = hasFrontier ? 'with-frontier' : 'without-frontier';
  return `${spectrumPrefix}-${parentPrefix}${name}-${frontierSuffix}`;
};

export const createThemeConfigForSpectrum = memoize(
  ({
    hasFrontier = false,
    name,
    palette,
    parentThemeConfig,
    spectrum,
  }: CreateThemeConfigForSpectrumParams): ThemeConfigForSpectrum => {
    const parentPalette: PaletteConfig = getParentPalette(spectrum, hasFrontier, parentThemeConfig);
    const fallbackPalette = isNormalConfig(palette) ? palette : parentPalette;
    const lightPalette = isLightConfig(palette) ? palette.light : fallbackPalette;
    const darkPalette = isDarkConfig(palette) ? palette.dark : fallbackPalette;
    const finalPalette = spectrum === 'light' ? lightPalette : darkPalette;
    const mergedPalette = { ...parentPalette, ...finalPalette };

    return {
      palette: mergedPalette,
      rgbaStrings: paletteConfigToRgbaStrings(mergedPalette, spectrum, hasFrontier),
      hexValues: paletteConfigToHexValues(mergedPalette, spectrum, hasFrontier),
      interactableTokens: paletteConfigToInteractableTokens(mergedPalette, spectrum, hasFrontier),
      name: getCacheKey({ name, hasFrontier, parentThemeConfig, spectrum }),
    };
  },
  getCacheKey,
);
