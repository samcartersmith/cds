import { PaletteConfig, PaletteConfigWithInteractableTokens, Spectrum } from '../types';

import { paletteValueToInteractableToken } from './paletteValueToInteractableToken';

export function paletteConfigToInteractableTokens(
  paletteConfig: PaletteConfig,
  spectrum: Spectrum,
  hasFrontier?: boolean,
) {
  // Object.keys + reduce is more performant than for/of loop https://jsbench.me/uhkyu88ggg/1
  return (Object.keys(paletteConfig) as Extract<keyof typeof paletteConfig, string>[]).reduce(
    (acc, paletteAlias) => {
      const paletteValue = paletteConfig[paletteAlias];
      acc[paletteAlias] = paletteValueToInteractableToken({
        paletteConfig,
        paletteValue,
        spectrum,
        hasFrontier,
      });
      return acc;
    },
    {} as PaletteConfigWithInteractableTokens,
  );
}
