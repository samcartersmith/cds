import {
  PaletteConfigWithInteractableTokens,
  PaletteConfig,
  PartialPaletteConfig,
  PartialThemeConfigForSpectrum,
  Spectrum,
} from '@cbhq/cds-common/types';
import { emptyObject } from '@cbhq/cds-utils';
import { paletteConfigToRgbaStrings } from '@cbhq/cds-common/palette/paletteConfigToRgbaStrings';
import { paletteConfigToInteractableTokens } from '@cbhq/cds-common/palette/paletteConfigToInteractableTokens';
import { paletteConfigToHexValues } from '@cbhq/cds-common/palette/paletteConfigToHexValues';
import { Palette } from '../Palette';

type SpectrumPalette = { light: PartialPaletteConfig; dark: PartialPaletteConfig };
type LightOnlyConfig = { light: PartialPaletteConfig };
type DarkOnlyConfig = { dark: PartialPaletteConfig };
type ThemePaletteConfig = PartialPaletteConfig | SpectrumPalette | LightOnlyConfig | DarkOnlyConfig;
export type BuildThemeConfig = {
  palette: ThemePaletteConfig;
  hasFrontier?: boolean;
};

type BuildThemeConfigResult = {
  light?: Omit<PartialThemeConfigForSpectrum, 'name' | 'interactableTokens'> & {
    interactableTokens?: PaletteConfigWithInteractableTokens;
  };
  dark?: Omit<PartialThemeConfigForSpectrum, 'name' | 'interactableTokens'> & {
    interactableTokens?: PaletteConfigWithInteractableTokens;
  };
};

function buildConfig(palette: PartialPaletteConfig, spectrum: Spectrum, hasFrontier: boolean) {
  return {
    palette,
    rgbaStrings: paletteConfigToRgbaStrings(palette, spectrum, hasFrontier),
    hexValues: paletteConfigToHexValues(palette, spectrum, hasFrontier),
    interactableTokens:
      palette && palette === Palette.defaultPalette
        ? paletteConfigToInteractableTokens(palette as unknown as PaletteConfig, spectrum)
        : undefined,
  };
}

function getLightPalette(palette: ThemePaletteConfig) {
  if ('light' in palette) {
    return palette.light;
  }
  if ('dark' in palette) {
    return undefined;
  }
  return palette;
}

function getDarkPalette(palette: ThemePaletteConfig) {
  if ('dark' in palette) {
    return palette.dark;
  }
  if ('light' in palette) {
    return undefined;
  }
  return palette;
}

export function buildTheme({
  palette = emptyObject,
  hasFrontier = false,
}: BuildThemeConfig): BuildThemeConfigResult {
  const lightPalette = getLightPalette(palette);
  const darkPalette = getDarkPalette(palette);
  return {
    light: lightPalette ? buildConfig(lightPalette, 'light', hasFrontier) : undefined,
    dark: darkPalette ? buildConfig(darkPalette, 'dark', hasFrontier) : undefined,
  };
}
