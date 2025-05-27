import type { InputVariant, MarginProps, PaddingProps } from '../types';

import { gutter } from './sizing';

type CellSpacingConfig = {
  innerSpacing?: PaddingProps & MarginProps;
  outerSpacing?: PaddingProps & MarginProps;
};

export const labelTextColor: InputVariant = 'foreground';

export const selectTriggerMinHeight = 56;

export const selectTriggerCompactMinHeight = 40;

/** Spacing config for Select Option (web) */
export const selectCellSpacingConfig: CellSpacingConfig = {
  outerSpacing: { paddingX: 0, paddingY: 0 },
  innerSpacing: { marginX: 0, paddingX: 2 },
};

/** Spacing config for Select Option (mobile) */
export const selectCellMobileSpacingConfig: CellSpacingConfig = {
  outerSpacing: { paddingX: 0, paddingY: 0 },
  innerSpacing: { marginX: 0, paddingX: gutter },
};
