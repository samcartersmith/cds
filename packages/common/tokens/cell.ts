import { ScaleDensity } from '../types/Scale';

import { gutter } from './sizing';

export type CellScaleDensity = Record<ScaleDensity, number>;

export const mediaSize: CellScaleDensity = {
  dense: 24,
  normal: 32,
};

// Height of the inner cell without padding
export const imageSize: CellScaleDensity = {
  dense: 40,
  normal: 48,
};

export const pictogramScaleMultiplier: CellScaleDensity = {
  dense: 0.834,
  normal: 1,
};

export const listHeight: CellScaleDensity = {
  normal: 80,
  dense: 64,
};

export const compactListHeight: CellScaleDensity = {
  normal: 40,
  dense: 36,
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

export const selectOptionHeight: CellScaleDensity = {
  normal: 56,
  dense: 44,
};

export const cellPriorities = ['start', 'middle', 'end'] as const;
