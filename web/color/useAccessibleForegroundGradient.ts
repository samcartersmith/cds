import { useMemo, useCallback } from 'react';

import {
  AccessibleForegroundParams,
  AccessibleForegroundGradientFn,
  GradientArray,
} from '@cbhq/cds-common';
import { getAccessibleForegroundGradient } from '@cbhq/cds-common/color/getAccessibleForegroundGradient';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';

import { usePaletteValueToRgbaString } from './usePaletteValueToRgbaString';

/** See http://cds.cbhq.net/hooks/useAccessibleForegroundGradient for details and examples. */
function useAccessibleForegroundGradient(params: AccessibleForegroundParams): GradientArray;
function useAccessibleForegroundGradient(params?: undefined): AccessibleForegroundGradientFn;
function useAccessibleForegroundGradient(params?: AccessibleForegroundParams) {
  const spectrum = useSpectrum();
  const paletteConfig = usePaletteConfig();
  const background = usePaletteValueToRgbaString(paletteConfig.background);
  const transformFn = usePaletteValueToRgbaString();
  const convert = useCallback(
    ({ color, usage }: AccessibleForegroundParams) =>
      getAccessibleForegroundGradient({ background, color, spectrum, transformFn, usage }),
    [background, spectrum, transformFn],
  );
  return useMemo(() => {
    if (params) {
      return convert(params);
    }
    return convert;
  }, [convert, params]);
}

export { useAccessibleForegroundGradient };
