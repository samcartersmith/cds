import { useCallback, useMemo } from 'react';
import type { AccessibleForegroundFn, AccessibleForegroundParams } from '@cbhq/cds-common';
import { getAccessibleForeground } from '@cbhq/cds-common/color/getAccessibleForeground';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';

import { usePaletteValueToRgbaString } from './usePaletteValueToRgbaString';

/** See http://cds.cbhq.net/hooks/useAccessibleForeground for details and examples. */
function useAccessibleForeground(params: AccessibleForegroundParams): string;
function useAccessibleForeground(params?: undefined): AccessibleForegroundFn;
function useAccessibleForeground(params?: AccessibleForegroundParams) {
  const { background: paletteBackground } = usePaletteConfig();
  const backgroundFromPalette = usePaletteValueToRgbaString(paletteBackground);
  const transformFn = usePaletteValueToRgbaString();
  const convert = useCallback(
    ({ background, color, usage }: AccessibleForegroundParams) =>
      getAccessibleForeground(background ?? backgroundFromPalette, color, usage, transformFn),
    [backgroundFromPalette, transformFn],
  );

  return useMemo(() => {
    if (params) {
      return convert(params);
    }
    return convert;
  }, [convert, params]);
}

export { useAccessibleForeground };
