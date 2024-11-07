import { useMemo } from 'react';

import { useScaleConditional } from '../scale/useScaleConditional';
import { Weight } from '../types/Weight';

export const useProgressSize = (weight: Weight) => {
  const heavyHeight = useScaleConditional({ dense: 10, normal: 12 });

  return useMemo(() => {
    switch (weight) {
      case 'semiheavy':
        return 8;
      case 'heavy':
        return heavyHeight;
      case 'thin':
        return 2;
      default:
        return 4;
    }
  }, [heavyHeight, weight]);
};
