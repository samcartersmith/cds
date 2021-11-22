import { ScaleDensity } from '../types';

/** WARNING: this will only work if all nodes within the stack don't increase the height of their parent */
export const selectInputHeight: Record<ScaleDensity, number> = {
  normal: 59,
  dense: 47,
};

export const menuOffsetWithHelperText: Record<ScaleDensity, number> = {
  normal: 43,
  dense: 39,
};

export const menuOffsetWithLabelAndHelperText: Record<ScaleDensity, number> = {
  normal: 91,
  dense: 75,
};

export const selectInputMenuMaxHeight = 560;
