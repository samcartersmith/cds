import {
  ThemeConfig,
  PartialThemeConfig,
  PartialLightThemeConfig,
  PartialDarkThemeConfig,
} from '../types';
import { paletteConfigToInteractableTokens } from '../palette/paletteConfigToInteractableTokens';

const cache: Record<string, ThemeConfig> = {};

function isLightConfig(config: PartialThemeConfig): config is PartialLightThemeConfig {
  if ('light' in config) {
    return true;
  }
  return false;
}
function isDarkConfig(config: PartialThemeConfig): config is PartialDarkThemeConfig {
  if ('dark' in config) {
    return true;
  }
  return false;
}

export function mergeThemeConfigs(config1: ThemeConfig, config2: PartialThemeConfig): ThemeConfig {
  const name = `${config1.name}-${config2.name}`;
  if (name in cache) {
    return cache[name];
  }
  const hasLightConfig = isLightConfig(config2);
  const hasDarkConfig = isDarkConfig(config2);

  const lightPalette = hasLightConfig
    ? { ...config1.light.palette, ...config2.light.palette }
    : config1.light.palette;

  const darkPalette = hasDarkConfig
    ? { ...config1.dark.palette, ...config2.dark.palette }
    : config1.dark.palette;

  const mergedConfig = {
    name,
    light: hasLightConfig
      ? {
          palette: lightPalette,
          rgbaStrings: { ...config1.light.rgbaStrings, ...config2.light.rgbaStrings },
          hexValues: { ...config1.light.hexValues, ...config2.light.hexValues },
          interactableTokens: paletteConfigToInteractableTokens(lightPalette, 'light'),
          name: `${name}-light`,
        }
      : config1.light,
    dark: hasDarkConfig
      ? {
          palette: darkPalette,
          rgbaStrings: { ...config1.dark.rgbaStrings, ...config2.dark.rgbaStrings },
          hexValues: { ...config1.dark.hexValues, ...config2.dark.hexValues },
          interactableTokens: paletteConfigToInteractableTokens(darkPalette, 'dark'),
          name: `${name}-dark`,
        }
      : config1.dark,
  };
  cache[name] = mergedConfig;
  return mergedConfig;
}
