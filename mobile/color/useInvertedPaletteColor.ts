import { PaletteAlias } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { useThemeConfig } from '../system/useThemeConfig';

export function useInvertedPaletteColor(alias: PaletteAlias) {
  const { config } = useThemeConfig();
  return useSpectrumConditional({
    light: config.dark.rgbaStrings[alias],
    dark: config.light.rgbaStrings[alias],
  });
}
