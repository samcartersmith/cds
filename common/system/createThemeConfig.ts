import { PartialPaletteConfig, PartialThemeConfig } from '../types';
import { paletteConfigToHexValues } from '../palette/paletteConfigToHexValues';
import { paletteConfigToRgbaStrings } from '../palette/paletteConfigToRgbaStrings';
import { paletteConfigToInteractableTokens } from '../palette/paletteConfigToInteractableTokens';

const cache: Record<string, PartialThemeConfig> = {};

/**
 * Custom theme configs are expensive if created during React lifecycle.
 * If a custom theme config does not need to be merged into another dynamic
 * parent theme config then it is recommended to create this outside of React lifecycle.
 * Currently CDS does not have an easy way for consumers to codegen these theme configs,
 * but if you reach out in #ask-cds then we can work with your team to add to the official CDS themes.
 * @param palette - a partial palette config
 * @param hasFrontier - (optional) boolean. If true it will use the new yellow from frontier work
 * when generating the rgbaStrings and hexValues.
 */
export function createThemeConfig({
  palette,
  hasFrontier,
  name,
}: {
  palette: PartialPaletteConfig;
  hasFrontier?: boolean;
  name: string;
}): PartialThemeConfig {
  if (name && cache[name]) {
    return cache[name];
  }
  const config = {
    name,
    light: {
      palette,
      rgbaStrings: paletteConfigToRgbaStrings(palette, 'light', hasFrontier),
      hexValues: paletteConfigToHexValues(palette, 'light', hasFrontier),
      interactableTokens: paletteConfigToInteractableTokens(palette, 'light'),
      name: `${name}-light`,
    },
    dark: {
      palette,
      rgbaStrings: paletteConfigToRgbaStrings(palette, 'dark', hasFrontier),
      hexValues: paletteConfigToHexValues(palette, 'dark', hasFrontier),
      interactableTokens: paletteConfigToInteractableTokens(palette, 'dark'),
      name: `${name}-dark`,
    },
  };

  cache[name] = config;
  return config;
}
