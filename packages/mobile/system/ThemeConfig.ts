import {
  PaletteAlias,
  PartialPaletteConfig,
  Spectrum,
  ThemeConfig,
  ThemeConfigForSpectrum,
} from '@cbhq/cds-common/types';

export type PaletteConfigWithRgbaStrings = Record<PaletteAlias, string>;
export type PaletteConfigWithHexValues = Record<PaletteAlias, string>;
export type InteractableState = keyof InteractableTokensConfig;
export type InteractableTokensForState = {
  contentOpacity: number;
  backgroundColor: string;
};
export type InteractableTokensConfig = {
  disabled: InteractableTokensForState;
  pressed: InteractableTokensForState;
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
  name: string;
  spectrum?: Spectrum | null;
};

export type CreateThemeConfigForSpectrumParams = CreateThemeConfigParams & {
  spectrum: Spectrum;
};
