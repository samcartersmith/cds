import { useMemo } from 'react';

import { useSpectrum } from '../spectrum/useSpectrum';
import { getSpectrumConditional } from '../color/getSpectrumConditional';
import type { SpectrumConditionalConfig } from '../types/Color';

/**
 * Conditionally return a value based on active spectrum.
 * @param config: An object with light and dark keys.
 * @returns value: The value to return when it's key is active.
 */
export const useSpectrumConditional = <T, K>({ light, dark }: SpectrumConditionalConfig<T, K>) => {
  const spectrum = useSpectrum();
  return useMemo(() => {
    return getSpectrumConditional({ light, dark }, spectrum);
  }, [spectrum, light, dark]);
};
