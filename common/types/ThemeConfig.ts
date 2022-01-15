import { PaletteAlias, PaletteConfig } from './Palette';

export type SpectrumObject<T> = { light: T; dark: T };

export type PaletteConfigWithRgbaStrings = Record<PaletteAlias, string>;
export type PaletteConfigWithHexValues = Record<PaletteAlias, string>;

export type ThemeConfig = SpectrumObject<{
  palette: PaletteConfig;
  rgbaStrings: PaletteConfigWithRgbaStrings;
  hexValues: PaletteConfigWithHexValues;
}>;
