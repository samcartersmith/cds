import { PaletteOrTransparentColor } from '@cbhq/cds-common/src/types';

import { usePalette } from './usePalette';

export const usePaletteOrTransparentColor = (color?: PaletteOrTransparentColor) => {
  const palette = usePalette();
  if (!color) return 'transparent';
  if (color === 'transparent') return 'transparent';
  return palette[color];
};
