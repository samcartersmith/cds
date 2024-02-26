import { PaletteConfig, PaletteConfigWithInteractableTokens, Spectrum } from '../types';

import { paletteValueToInteractableToken } from './paletteValueToInteractableToken';

type PaletteConfigToInteractableTokensParams = {
  paletteConfig: PaletteConfig;
  spectrum: Spectrum;
  isWeb?: boolean;
};

export function paletteConfigToInteractableTokens({
  paletteConfig,
  spectrum,
  isWeb,
}: PaletteConfigToInteractableTokensParams) {
  // Object.keys + reduce is more performant than for/of loop https://jsbench.me/uhkyu88ggg/1
  return (Object.keys(paletteConfig) as Extract<keyof typeof paletteConfig, string>[]).reduce(
    (acc, paletteAlias) => {
      const paletteValue = paletteConfig[paletteAlias];
      acc[paletteAlias] = paletteValueToInteractableToken({
        paletteValue,
        options: {
          paletteConfig,
          spectrum,
          isWeb,
        },
      });
      return acc;
    },
    {} as PaletteConfigWithInteractableTokens,
  );
}
