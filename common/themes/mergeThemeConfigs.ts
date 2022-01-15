import {
  ThemeConfig,
  PaletteConfig,
  PartialPaletteConfig,
  PaletteAlias,
  SpectrumObject,
} from '../types';

export function mergeThemeConfigs(
  config1: {
    light: {
      palette: PaletteConfig;
      rgbaStrings: Record<PaletteAlias, string>;
      hexValues: Record<PaletteAlias, string>;
    };
    dark: {
      palette?: PaletteConfig;
      rgbaStrings: Record<PaletteAlias, string>;
      hexValues: Record<PaletteAlias, string>;
    };
  },
  config2: SpectrumObject<{
    palette?: PartialPaletteConfig;
    rgbaStrings: { [key in PaletteAlias]?: string };
    hexValues: { [key in PaletteAlias]?: string };
  }>,
): ThemeConfig {
  return {
    light: {
      palette: { ...config1.light.palette, ...config2.light.palette },
      rgbaStrings: { ...config1.light.rgbaStrings, ...config2.light.rgbaStrings },
      hexValues: { ...config1.light.hexValues, ...config2.light.hexValues },
    },
    dark: {
      palette: { ...config1.light.palette, ...config1.dark?.palette, ...config2.dark?.palette },
      rgbaStrings: { ...config1.dark.rgbaStrings, ...config2.dark.rgbaStrings },
      hexValues: { ...config1.dark.hexValues, ...config2.dark?.hexValues },
    },
  };
}
