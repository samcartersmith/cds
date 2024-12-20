import type { PaletteAlias, PaletteConfigToRgbaStrings } from '../types';

import { paletteValueToRgbaString } from './paletteValueToRgbaString';

/**
 * `Please don't use this unless you absolutely have to. This is meant as last resort.`
 * Takes a palette config and returns an object to access computed color values based on config.
 * @param paletteConfig  - { background: 'gray0' }
 * @param spectrum - light or dark
 * @returns { background: 'rgb(255, 255, 255)' }
 */
export const paletteConfigToRgbaStrings: PaletteConfigToRgbaStrings = (paletteConfig, spectrum) => {
  // Object.keys + reduce is more performant than for/of loop https://jsbench.me/uhkyu88ggg/1
  return (Object.keys(paletteConfig) as Extract<keyof typeof paletteConfig, string>[]).reduce(
    (acc, paletteAlias) => {
      const value = paletteConfig[paletteAlias];
      if (value) {
        acc[paletteAlias] = paletteValueToRgbaString(value, spectrum);
      }
      return acc;
    },
    {} as Record<PaletteAlias, string>,
  );
};
