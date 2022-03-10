import { useMemo } from 'react';
import { useScaleConditional } from '../scale/useScaleConditional';
import { Weight } from '../types/Weight';

export const useProgressSize = (weight: Weight) => {
  const heavyHeight = useScaleConditional({ dense: 10, normal: 12 });
  return useMemo(() => {
    if (weight === 'heavy') {
      return heavyHeight;
    }

    return 4;
  }, [heavyHeight, weight]);
};
