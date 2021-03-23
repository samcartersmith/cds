import type { PaletteValue, SpectrumHueStep } from '../types';

const SPECTRUM_ALIAS_REGEX = /[a-z]+(\d+)/;

export const extractHueStep = (value: Readonly<PaletteValue>): SpectrumHueStep => {
  const [alias] = typeof value === 'string' ? [value] : value;
  const [, step] = alias.match(SPECTRUM_ALIAS_REGEX) || [];
  return Number(step) as SpectrumHueStep;
};
