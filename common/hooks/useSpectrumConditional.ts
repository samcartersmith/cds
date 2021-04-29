import { useMemo } from 'react';

import { useSpectrum } from '../spectrum/useSpectrum';

type Config<T, K> = {
  light: T;
  dark: K;
};

/**
 * Conditionally return a value based on active spectrum.
 * @param config: An object with light and dark keys.
 * @returns value: The value to return when it's key is active.
 */
export const useSpectrumConditional = <T, K>({ light, dark }: Config<T, K>) => {
  const spectrum = useSpectrum();
  return useMemo(() => {
    return spectrum === 'light' ? light : dark;
  }, [spectrum, light, dark]);
};
