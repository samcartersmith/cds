import { useCallback, useMemo } from 'react';
import { PaletteValue, PaletteValueToRgbaStringFn } from '@cbhq/cds-common';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';

import { paletteValueToRgbaString } from '../utils/palette';

/**
 * Get rgba string for a palette value.
 * Returns an rgba string or function to get an rgba string.
 */
function usePaletteValueToRgbaString(params: PaletteValue): string;
function usePaletteValueToRgbaString(params?: undefined): PaletteValueToRgbaStringFn;
function usePaletteValueToRgbaString(params?: PaletteValue) {
  const spectrum = useSpectrum();
  const convertToRgbaString = useCallback(
    (paletteValue: PaletteValue) => paletteValueToRgbaString(paletteValue, spectrum),
    [spectrum],
  );
  return useMemo(() => {
    if (params) {
      return convertToRgbaString(params);
    }
    return convertToRgbaString;
  }, [convertToRgbaString, params]);
}

export { usePaletteValueToRgbaString };
