import { useMemo } from 'react';
import { useScaleConditional } from '../scale/useScaleConditional';
import { ProgressBarWeight } from '../types/ProgressBarBaseProps';

export const useProgressBarHeight = (weight: ProgressBarWeight) => {
  const heavyHeight = useScaleConditional({ dense: 10, normal: 12 });
  return useMemo(() => {
    if (weight === 'heavy') {
      return heavyHeight;
    }

    return 4;
  }, [heavyHeight, weight]);
};
