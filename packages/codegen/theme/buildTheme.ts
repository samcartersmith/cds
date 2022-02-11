import { paletteConfigToHexValues } from '@cbhq/cds-common/palette/paletteConfigToHexValues';
import { paletteConfigToInteractableTokens } from '@cbhq/cds-common/palette/paletteConfigToInteractableTokens';
import { paletteConfigToRgbaStrings } from '@cbhq/cds-common/palette/paletteConfigToRgbaStrings';
import {
  PartialPaletteConfig,
  PartialThemeConfig,
  PartialThemeConfigForSpectrum,
} from '@cbhq/cds-common/types';

import { Palette } from '../Palette';

type SpectrumPalette = { light: PartialPaletteConfig; dark: PartialPaletteConfig };
type LightOnlyConfig = { light: PartialPaletteConfig };
type DarkOnlyConfig = { dark: PartialPaletteConfig };
type ThemePaletteConfig = PartialPaletteConfig | SpectrumPalette | LightOnlyConfig | DarkOnlyConfig;
export type BuildThemeConfig = {
  palette?: ThemePaletteConfig;
  hasFrontier?: boolean;
};

export function buildTheme({
  palette = Palette.defaultPalette,
  hasFrontier = false,
}: BuildThemeConfig): Omit<PartialThemeConfig, 'name'> {
  if ('light' in palette || 'dark' in palette) {
    const temp: {
      light: PartialThemeConfigForSpectrum | undefined;
      dark: PartialThemeConfigForSpectrum | undefined;
    } = { light: undefined, dark: undefined };

    if ('light' in palette) {
      temp.light = {
        palette: palette.light,
        rgbaStrings: paletteConfigToRgbaStrings(palette.light, 'light', hasFrontier),
        hexValues: paletteConfigToHexValues(palette.light, 'light', hasFrontier),
        interactableTokens: paletteConfigToInteractableTokens(palette.light, 'light'),
      };
    }
    if ('dark' in palette) {
      temp.dark = {
        palette: palette.dark,
        rgbaStrings: paletteConfigToRgbaStrings(palette.dark, 'dark', hasFrontier),
        hexValues: paletteConfigToHexValues(palette.dark, 'dark', hasFrontier),
        interactableTokens: paletteConfigToInteractableTokens(palette.dark, 'dark'),
      };
    }

    return temp;
  }

  return {
    light: {
      palette,
      rgbaStrings: paletteConfigToRgbaStrings(palette, 'light', hasFrontier),
      hexValues: paletteConfigToHexValues(palette, 'light', hasFrontier),
      interactableTokens: paletteConfigToInteractableTokens(palette, 'light'),
    },
    dark: {
      palette,
      rgbaStrings: paletteConfigToRgbaStrings(palette, 'dark', hasFrontier),
      hexValues: paletteConfigToHexValues(palette, 'dark', hasFrontier),
      interactableTokens: paletteConfigToInteractableTokens(palette, 'dark'),
    },
  };
}
