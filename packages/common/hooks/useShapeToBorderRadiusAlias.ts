import { useMemo } from 'react';

import { BorderRadiusAlpha } from '../types/BorderRadius';
import { Shape } from '../types/Shape';

export function useShapeToBorderRadiusAlias(shape: Shape | undefined) {
  return useMemo(() => {
    let borderRadius: BorderRadiusAlpha | undefined;

    if (shape === 'circle') {
      borderRadius = 'roundedFull';
    }
    if (shape === 'squircle') {
      borderRadius = 'rounded';
    }
    if (shape === 'square') {
      borderRadius = 'roundedSmall';
    }

    return borderRadius;
  }, [shape]);
}
