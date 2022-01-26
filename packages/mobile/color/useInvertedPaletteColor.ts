import { PaletteAlias } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';

import { paletteValueToRgbaString } from '../utils/palette';

export function useInvertedPaletteColor(alias: PaletteAlias) {
  const palette = usePaletteConfig();
  return useSpectrumConditional({
    light: paletteValueToRgbaString(palette[alias], 'dark'),
    dark: paletteValueToRgbaString(palette[alias], 'light'),
  });
}
