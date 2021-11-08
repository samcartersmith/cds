import { ScaleDensity } from '../types/Scale';
import { gutter } from './sizing';
import { CellSpacingConfig } from '../types/CellBaseProps';

export const mediaSize: Record<ScaleDensity, number> = {
  dense: 24,
  normal: 32,
};

// Height of the inner cell without padding
export const imageSize: Record<ScaleDensity, number> = {
  dense: 40,
  normal: 48,
};

export const listHeight: Record<ScaleDensity, number> = {
  dense: 64,
  normal: 80,
};

/** Spacing configs for Cells to be parsed in common/hooks/useCellSpacing */

/** Default spacing config */
export const defaultSpacingConfig = {
  innerSpacing: {
    spacingHorizontal: 2,
    spacingVertical: 1,
    offsetHorizontal: 2,
  },
  outerSpacing: {
    spacingHorizontal: gutter,
    spacingVertical: 1,
    offsetHorizontal: 0,
  },
} as const;

/** Spacing config for Select (web) or Tray (mobile) Cell */
export const selectCellSpacingConfig: CellSpacingConfig = {
  outerSpacing: { spacingHorizontal: 0, spacingVertical: 0 },
  innerSpacing: { offsetHorizontal: 0, spacingHorizontal: gutter },
};
