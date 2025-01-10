import { useMemo } from 'react';

import { ThemeVars } from '../core/theme';
import { Shape } from '../types/Shape';

export function useShapeToBorderRadiusAlias(
  shape: Shape | undefined,
): ThemeVars.BorderRadius | undefined {
  return useMemo(() => {
    switch (shape) {
      case 'circle':
        return 1000;
      case 'squircle':
        return 200;
      case 'square':
        return 100;
      default:
        return undefined;
    }
  }, [shape]);
}
