import { useCallback, useMemo } from 'react';
import {
  AccessibleForegroundGradientFn,
  AccessibleForegroundParams,
  GradientArray,
} from '@cbhq/cds-common';
import { getAccessibleForegroundGradient } from '@cbhq/cds-common/src/color/getAccessibleForegroundGradient';
import { useSpectrum } from '@cbhq/cds-common/src/spectrum/useSpectrum';

import { usePalette } from '../hooks/usePalette';

import { usePaletteValueToRgbaString } from './usePaletteValueToRgbaString';

/** See http://cds.cbhq.net/hooks/useAccessibleForegroundGradient for details and examples. */
function useAccessibleForegroundGradient(params: AccessibleForegroundParams): GradientArray;
function useAccessibleForegroundGradient(params?: undefined): AccessibleForegroundGradientFn;
function useAccessibleForegroundGradient(params?: AccessibleForegroundParams) {
  const spectrum = useSpectrum();
  const { background: backgroundFromPalette } = usePalette();
  const transformFn = usePaletteValueToRgbaString();
  const convert = useCallback(
    ({ background, color, usage }: AccessibleForegroundParams) =>
      getAccessibleForegroundGradient({
        background: background ?? backgroundFromPalette,
        color,
        spectrum,
        transformFn,
        usage,
      }),
    [backgroundFromPalette, spectrum, transformFn],
  );
  return useMemo(() => {
    if (params) {
      return convert(params);
    }
    return convert;
  }, [convert, params]);
}

export { useAccessibleForegroundGradient };
