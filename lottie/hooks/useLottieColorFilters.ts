import { useMemo } from 'react';

import { PaletteAlias, Palette } from '@cds/common';
import { rgba2hex } from '@cds/utils';

import { LottieColorFilter, LottieSource } from '../types';

/**
 * Override colors of Lottie layers.
 * Theme dependent layers should use PaletteAlias as layer name in After Effects i.e 'foreground' or 'primary'
 */
export function useLottieColorFilters(
  palette: Palette,
  source: LottieSource,
  customColorFilters?: LottieColorFilter
) {
  const themeColorFilters = useMemo(() => {
    const filters: LottieColorFilter = [];
    // If source is json file then we know layers will be present otherwise this is a remote lottie asset with { uri: string } interface
    if ('layers' in source) {
      for (const layer of source.layers) {
        if (layer.nm in palette) {
          const keypath = layer.nm as PaletteAlias;
          filters.push({
            keypath,
            // Lottie cannot process rgba values
            color: rgba2hex(palette[keypath]),
          });
        }
      }
    }
    return filters;
  }, [palette, source]);

  return useMemo(() => {
    if (customColorFilters) {
      return [...themeColorFilters, ...customColorFilters];
    }
    return themeColorFilters;
  }, [customColorFilters, themeColorFilters]);
}
