import { useMemo } from 'react';

import { BorderRadiusAlpha } from '../types/BorderRadius';
import { Shape } from '../types/Shape';

export function useShapeToBorderRadiusAlias(
  shape: Shape | undefined,
): BorderRadiusAlpha | undefined {
  return useMemo(() => {
    switch (shape) {
      case 'circle':
        return 'roundedFull';
      case 'squircle':
        return 'rounded';
      case 'square':
        return 'roundedSmall';
      default:
        return undefined;
    }
  }, [shape]);
}
