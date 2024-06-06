import { useMemo } from 'react';

import { useScaleDensity } from './useScaleDensity';

type Config<T, K> = {
  dense: T;
  normal: K;
};

/**
 * Conditionally return a value based on scale density.
 * @param config: An object with dense and normal keys.
 * @returns value: The value to return when it's key is active.
 */
export const useScaleConditional = <T, K>({ dense, normal }: Config<T, K>) => {
  const density = useScaleDensity();

  return useMemo(() => {
    return density === 'dense' ? dense : normal;
  }, [density, dense, normal]);
};
