import type { PaletteValue, SpectrumHue, SpectrumHueStep } from '../types';

import { paletteValueToTuple } from './paletteValueToTuple';

const HUE_STEP_REGEX = /[a-z]+|[^a-z]+/gi;

type HueStepTuple = [SpectrumHue, SpectrumHueStep];

export const paletteValueToHueStepTuple = (paletteValue: PaletteValue): HueStepTuple => {
  const [alias] = paletteValueToTuple(paletteValue);
  const [hue, step] = alias.match(HUE_STEP_REGEX) ?? [];
  if (hue && step) return [hue, Number(step)] as HueStepTuple;
  return ['gray', 100];
};
