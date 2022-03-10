import type { Spectrum, SpectrumConditionalConfig } from '../types';

export function getSpectrumConditional<T, K>(
  { light, dark }: SpectrumConditionalConfig<T, K>,
  spectrum: Spectrum,
) {
  return spectrum === 'light' ? light : dark;
}
