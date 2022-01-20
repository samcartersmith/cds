import { entries } from '@cbhq/cds-utils';
import { InteractableTokensConfig, PaletteAlias, PaletteConfig, Spectrum } from '../types';
import { paletteValueToInteractableToken } from './paletteValueToInteractableToken';

export function paletteConfigToInteractableTokens(
  paletteConfig: PaletteConfig,
  spectrum: Spectrum,
  hasFrontier?: boolean,
) {
  const config = {} as Record<PaletteAlias, InteractableTokensConfig>;
  for (const [key, value] of entries(paletteConfig)) {
    config[key] = paletteValueToInteractableToken(paletteConfig, value, spectrum, hasFrontier);
  }
  return config;
}
