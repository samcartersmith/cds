import { useCallback, useMemo } from 'react';

import type { AccessibleForegroundFn, AccessibleForegroundParams } from '@cbhq/cds-common';
import { getAccessibleForeground } from '@cbhq/cds-common/color/getAccessibleForeground';
import { usePaletteConfig } from '@cbhq/cds-common/palette/usePaletteConfig';

import { usePaletteValueToRgbaString } from './usePaletteValueToRgbaString';

/** See http://cds.cbhq.net/hooks/useAccessibleForeground for details and examples. */
function useAccessibleForeground(params: AccessibleForegroundParams): string;
function useAccessibleForeground(params?: undefined): AccessibleForegroundFn;
function useAccessibleForeground(params?: AccessibleForegroundParams) {
  const paletteConfig = usePaletteConfig();
  const background = usePaletteValueToRgbaString(paletteConfig.background);
  const transformFn = usePaletteValueToRgbaString();
  const convert = useCallback(
    ({ color, usage }: AccessibleForegroundParams) =>
      getAccessibleForeground(background, color, usage, transformFn),
    [background, transformFn],
  );

  return useMemo(() => {
    if (params) {
      return convert(params);
    }
    return convert;
  }, [convert, params]);
}

export { useAccessibleForeground };
