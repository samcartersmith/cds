import { useMemo } from 'react';
import { LottieSource } from '@cbhq/cds-common2';
import { colorToHex } from '@cbhq/cds-common2/color/colorToHex';
import { mapKeys } from '@cbhq/cds-utils';

import { useTheme } from '../system/ThemeProvider';

import { LottieProps } from './LottieProps';

/**
 * Override colors of Lottie layers.
 * Theme dependent layers should use PaletteAlias as layer name in After Effects i.e 'foreground' or 'primary'
 */
export function useLottieColorFilters(
  source: LottieSource,
  customColorFilters?: LottieProps['colorFilters'],
) {
  const theme = useTheme();
  // Layer names in AE will use palette_<PaletteAlias> format to avoid overriding layers not intended for overrides
  const paletteSnakeCased = useMemo(
    () => mapKeys(theme.color, (_, key) => `palette_${key}` as const),
    [theme.color],
  );

  const themeColorFilters = useMemo(() => {
    const filters: LottieProps['colorFilters'] = [];
    if (source?.layers) {
      for (const layer of source.layers) {
        if (layer.nm in paletteSnakeCased) {
          const keypath = layer.nm as keyof typeof paletteSnakeCased;
          filters.push({
            keypath,
            // Lottie cannot process rgba values so we convert to 8 digit hex
            color: colorToHex(paletteSnakeCased[keypath]),
          });
        }
      }
    }
    return filters;
  }, [paletteSnakeCased, source]);

  return useMemo(() => {
    if (customColorFilters) {
      return [...themeColorFilters, ...customColorFilters];
    }
    return themeColorFilters;
  }, [customColorFilters, themeColorFilters]);
}
