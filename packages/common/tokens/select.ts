import { CellSpacingConfig, InputVariant, ScaleDensity } from '../types';

import { gutter } from './sizing';

export const labelTextColor: InputVariant = 'foreground';

export const selectTriggerMinHeight: Record<ScaleDensity, number> = {
  normal: 56,
  dense: 44,
};

export const selectTriggerCompactMinHeight: Record<ScaleDensity, number> = {
  normal: 40,
  dense: 36,
};

/** Spacing config for Select Option (web) */
export const selectCellSpacingConfig: CellSpacingConfig = {
  outerPadding: { spacingHorizontal: 0, spacingVertical: 0 },
  innerPadding: { offsetHorizontal: 0, spacingHorizontal: 2 },
};

/** Spacing config for Select Option (mobile) */
export const selectCellMobileSpacingConfig: CellSpacingConfig = {
  outerPadding: { spacingHorizontal: 0, spacingVertical: 0 },
  innerPadding: { offsetHorizontal: 0, spacingHorizontal: gutter },
};
