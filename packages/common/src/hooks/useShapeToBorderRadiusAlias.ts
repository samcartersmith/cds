import { useMemo } from 'react';

import { BorderRadius } from '../types/BorderRadius';
import { Shape } from '../types/Shape';

export function useShapeToBorderRadiusAlias(shape: Shape | undefined): BorderRadius | undefined {
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
