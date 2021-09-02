import { useMemo } from 'react';

import { borderRadius as borderRadii } from '../tokens/border';
import { Shape } from '../types/Shape';

export function useFallbackShape(shape: Shape, baseWidth: number | string) {
  const width = useMemo(() => {
    // When rectangle, lets randomize the width a bit so things are
    // a little less... uniform. Variety is nice.
    if (
      shape === 'rectangle' &&
      typeof baseWidth === 'number' &&
      process.env.NODE_ENV !== 'test' &&
      !process.env.PERCY_TOKEN
    ) {
      const quarter = Math.round(baseWidth / 4);
      const min = Math.max(baseWidth - quarter, 1);
      const max = baseWidth + quarter;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // All other shapes need a fixed aspect ratio
    return baseWidth;
  }, [baseWidth, shape]);

  const borderRadius = useMemo(() => {
    if (shape === 'circle' && Number.isInteger(width)) {
      return Number(width) / 2;
    }

    return shape === 'squircle' ? borderRadii.standard : 0;
  }, [shape, width]);

  return useMemo(() => ({ borderRadius, width }), [borderRadius, width]);
}
