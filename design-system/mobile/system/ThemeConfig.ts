import {
  PaletteAlias,
  PaletteConfig,
  PartialPaletteConfig,
  Spectrum,
} from '@cbhq/cds-common/types';

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
  interactableTokens: PaletteConfigWithInteractableTokens;
  name: string;
};

export type ThemeConfig = {
  light: ThemeConfigForSpectrum;
  dark: ThemeConfigForSpectrum;
  name: string;
};

export type PartialPaletteConfigLight = {
  light: PartialPaletteConfig;
};

export type PartialPaletteConfigDark = {
  dark: PartialPaletteConfig;
};

export type NewPartialPaletteConfig =
  | {
      light?: PartialPaletteConfig;
      dark?: PartialPaletteConfig;
    }
  | PartialPaletteConfigLight
  | PartialPaletteConfigDark
  | PartialPaletteConfig;

export type ThemeConfigContextValue = {
  activeConfig: ThemeConfigForSpectrum;
  config: ThemeConfig;
};

export type CreateThemeConfigParams = {
  palette: NewPartialPaletteConfig;
  parentThemeConfig?: ThemeConfig;
  hasFrontier?: boolean;
  name: string;
};

export type CreateThemeConfigForSpectrumParams = CreateThemeConfigParams & {
  spectrum: Spectrum;
};
