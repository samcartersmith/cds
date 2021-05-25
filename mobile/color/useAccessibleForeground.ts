import { useCallback } from 'react';

import { useSpectrum, A11yColorUsage, PaletteValue } from '@cbhq/cds-common';
import { useAccessibleForeground as _useAccessibleForeground } from '@cbhq/cds-common/color/useAccessibleForeground';

import { usePalette } from '../hooks/usePalette';
import { paletteValueToRgbaString } from '../utils/palette';

export const useAccessibleForeground = (
  /** Any valid color (hex, rgb, rgba). */
  color: string,
  /** Where the foreground color is being applied. */
  usage: A11yColorUsage
) => {
  const palette = usePalette();
  const spectrum = useSpectrum();
  const transformFn = useCallback(
    (value: PaletteValue) => paletteValueToRgbaString(value, spectrum),
    [spectrum]
  );
  return _useAccessibleForeground(palette.background, color, usage, transformFn);
};
