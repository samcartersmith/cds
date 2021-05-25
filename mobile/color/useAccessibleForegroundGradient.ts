import { useMemo } from 'react';

import { useSpectrum } from '@cbhq/cds-common';
import { colorToSpectrumAlias } from '@cbhq/cds-common/color/colorToSpectrumAlias';
import { darkenColor } from '@cbhq/cds-common/color/darkenColor';
import { incrementHueStep } from '@cbhq/cds-common/color/incrementHueStep';
import { isAccessibleColor } from '@cbhq/cds-common/color/isAccessibleColor';

import { usePalette } from '../hooks/usePalette';
import { paletteValueToRgbaString } from '../utils/palette';
import { useAccessibleForeground } from './useAccessibleForeground';

export const useAccessibleForegroundGradient = (
  /** Any valid color (hex, rgb, rgba). */
  color: string
): [string, string] => {
  const spectrum = useSpectrum();
  const { background } = usePalette();
  const darkModeColor = useAccessibleForeground(color, 'graphic');
  return useMemo(() => {
    let color1 = color;
    let color2 = color;
    // Disable gradients in dark mode
    if (spectrum === 'dark') {
      color1 = darkModeColor;
      color2 = darkModeColor;
    } else if (isAccessibleColor(background, color, 'graphic')) {
      color1 = color;
      color2 = darkenColor(color) ?? color;
    } else {
      const alias1 = colorToSpectrumAlias(color, 'graphic');
      const alias2 = incrementHueStep(alias1);
      color1 = paletteValueToRgbaString(alias1, spectrum);
      color2 = paletteValueToRgbaString(alias2, spectrum);
    }
    return [color1, color2];
  }, [background, color, darkModeColor, spectrum]);
};
