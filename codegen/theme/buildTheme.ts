import { PartialPaletteConfig } from '@cbhq/cds-common/types/Palette';
import { paletteConfigToRgbaStrings } from '@cbhq/cds-common/palette/paletteConfigToRgbaStrings';
import { paletteConfigToHexValues } from '@cbhq/cds-common/palette/paletteConfigToHexValues';
import { Palette } from '../Palette';

type SpectrumPalette = { light: PartialPaletteConfig; dark: PartialPaletteConfig };
export type BuildThemeConfig = {
  palette?: PartialPaletteConfig | SpectrumPalette;
  hasFrontier?: boolean;
};

function isDarkPalette(
  palette: PartialPaletteConfig | SpectrumPalette,
): palette is SpectrumPalette {
  if ('light' in palette) {
    if ('dark' in palette) {
      return true;
    }
  }
  return false;
}

export function buildTheme({
  palette = Palette.defaultPalette,
  hasFrontier = false,
}: BuildThemeConfig) {
  const lightPalette = isDarkPalette(palette) ? palette.light : palette;
  const darkPalette = isDarkPalette(palette) ? palette.dark : palette;
  return {
    light: {
      palette: lightPalette,
      rgbaStrings: paletteConfigToRgbaStrings(lightPalette, 'light', hasFrontier),
      // rgbaArrays: convertPaletteToRgbaArray(lightColors, lightPalette), // We don't need this yet, but keeping in case we need for interactable styling
      hexValues: paletteConfigToHexValues(lightPalette, 'light', hasFrontier),
    },
    dark: {
      ...(isDarkPalette(palette) ? { palette: darkPalette } : {}),
      rgbaStrings: paletteConfigToRgbaStrings(darkPalette, 'dark', hasFrontier),
      // rgbaArrays: convertPaletteToRgbaArray(darkColors, darkPalette),
      hexValues: paletteConfigToHexValues(lightPalette, 'dark', hasFrontier),
    },
  };
}
