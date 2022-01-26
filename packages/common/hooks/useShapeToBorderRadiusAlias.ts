import { useMemo } from 'react';

import { BorderRadius } from '../types/BorderRadius';
import { Shape } from '../types/Shape';

export function useShapeToBorderRadiusAlias(shape: Shape | undefined) {
  return useMemo(() => {
    let borderRadius: BorderRadius | undefined;

    if (shape === 'circle') {
      borderRadius = 'round';
    }
    if (shape === 'squircle') {
      borderRadius = 'standard';
    }

    return borderRadius;
  }, [shape]);
}
