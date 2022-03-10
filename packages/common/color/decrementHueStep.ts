import { paletteValueToHueStepTuple } from '../palette/paletteValueToHueStepTuple';
import type { SpectrumAlias } from '../types';

import { hueStepMap,hueSteps } from './hueSteps';

export const decrementHueStep = (alias: SpectrumAlias) => {
  const [hue, step] = paletteValueToHueStepTuple(alias);
  const index = hueStepMap[step];
  const newIndex = index - 1;
  if (hueSteps[newIndex]) {
    const newStep = hueSteps[newIndex];
    return `${hue}${newStep}` as SpectrumAlias;
  }
  return alias;
};
