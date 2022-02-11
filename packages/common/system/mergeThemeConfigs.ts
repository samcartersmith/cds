/* eslint-disable prefer-object-spread */
import {
  PartialDarkThemeConfig,
  PartialLightThemeConfig,
  PartialThemeConfig,
  ThemeConfig,
} from '../types';

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
  const mergedConfig = {
    name,
    light: hasLightConfig
      ? {
          palette: Object.assign({}, config1.light.palette, config2.light.palette),
          rgbaStrings: Object.assign({}, config1.light.rgbaStrings, config2.light.rgbaStrings),
          hexValues: Object.assign({}, config1.light.hexValues, config2.light.hexValues),
          interactableTokens: Object.assign(
            {},
            config1.light.interactableTokens,
            config2.light.interactableTokens,
          ),
          name: `${name}-light`,
        }
      : config1.light,
    dark: hasDarkConfig
      ? {
          palette: Object.assign({}, config1.dark.palette, config2.dark.palette),
          rgbaStrings: Object.assign({}, config1.dark.rgbaStrings, config2.dark.rgbaStrings),
          hexValues: Object.assign({}, config1.dark.hexValues, config2.dark.hexValues),
          interactableTokens: Object.assign(
            {},
            config1.dark.interactableTokens,
            config2.dark.interactableTokens,
          ),
          name: `${name}-dark`,
        }
      : config1.dark,
  };
  cache[name] = mergedConfig;
  return mergedConfig;
}
