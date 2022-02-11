import { PaletteAlias, PaletteConfig, PartialPaletteConfig } from './Palette';

export type SpectrumObject<T> = { light: T; dark: T };

export type PaletteConfigWithRgbaStrings = Record<PaletteAlias, string>;
export type PaletteConfigWithHexValues = Record<PaletteAlias, string>;
export type PaletteConfigWithInteractableTokens = Record<PaletteAlias, InteractableTokensConfig>;
export type InteractableState = keyof InteractableTokensConfig;
export type InteractableTokensForState = {
  contentOpacity: number;
  backgroundColor: string;
};
export type InteractableTokensConfig = {
  disabled: InteractableTokensForState;
  pressed: InteractableTokensForState;
};

export type ThemeConfigForSpectrum = {
  palette: PaletteConfig;
  rgbaStrings: PaletteConfigWithRgbaStrings;
  hexValues: PaletteConfigWithHexValues;
  interactableTokens: PaletteConfigWithInteractableTokens;
  name: string;
};

export type ThemeConfig = {
  light: ThemeConfigForSpectrum;
  dark: ThemeConfigForSpectrum;
  name: string;
};

export type PartialThemeConfigForSpectrum = {
  palette?: PartialPaletteConfig;
  rgbaStrings: { [key in PaletteAlias]?: string };
  hexValues: { [key in PaletteAlias]?: string };
  interactableTokens: { [key in PaletteAlias]?: InteractableTokensConfig };
};

export type PartialLightThemeConfig = {
  light: PartialThemeConfigForSpectrum;
  name: string;
};

export type PartialDarkThemeConfig = {
  dark: PartialThemeConfigForSpectrum;
  name: string;
};

export type PartialThemeConfig =
  | {
      light?: PartialThemeConfigForSpectrum;
      dark?: PartialThemeConfigForSpectrum;
      name: string;
    }
  | PartialLightThemeConfig
  | PartialDarkThemeConfig;

export type ThemeConfigContextValue = {
  activeConfig: ThemeConfigForSpectrum;
  config: ThemeConfig;
};
