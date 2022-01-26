import { entries } from '@cbhq/cds-utils';

import type { PaletteAlias, PaletteConfigToRgbaStrings } from '../types';

import { paletteValueToRgbaString } from './paletteValueToRgbaString';

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette config and returns an object to access computed color values based on config.
 * @param paletteConfig  - { background: 'gray0' }
 * @param spectrum - light or dark
 * @param hasFrontier - boolean returned from useFeatureFlag('frontierColor')
 * @returns { background: 'rgb(255, 255, 255)' }
 */
export const paletteConfigToRgbaStrings: PaletteConfigToRgbaStrings = (
  paletteConfig,
  spectrum,
  hasFrontier,
) => {
  const config = {} as Record<PaletteAlias, string>;
  for (const [key, value] of entries(paletteConfig)) {
    if (value) {
      config[key] = paletteValueToRgbaString(value, spectrum, hasFrontier);
    }
  }
  return config;
};
