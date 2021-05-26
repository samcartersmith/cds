import { PaletteOrTransparentColor } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { Platform } from 'react-native';

import { usePaletteOrTransparentColor } from './usePaletteOrTransparentColor';

export const useElevationBorderColor = (color: PaletteOrTransparentColor | undefined = 'line') => {
  const defaultBorderColor = usePaletteOrTransparentColor(color);
  return Platform.select({
    ios: defaultBorderColor,
    // Hide border unless dark mode
    android: useSpectrumConditional({
      light: undefined,
      dark: defaultBorderColor,
    }),
  });
};
