import { InputVariant, ScaleDensity } from '../types';

export const labelTextColor: InputVariant = 'foreground';

export const selectTriggerMinHeight: Record<ScaleDensity, number> = {
  normal: 56,
  dense: 44,
};

export const selectTriggerCompactMinHeight: Record<ScaleDensity, number> = {
  normal: 40,
  dense: 36,
};
