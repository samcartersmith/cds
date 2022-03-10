import { ScaleDensity,SpacingScale } from '../types';

export const accordionSpacing: Record<ScaleDensity, Record<string, SpacingScale>> = {
  normal: {
    spacingTop: 2,
    spacingHorizontal: 3,
    spacingBottom: 3,
  },
  dense: {
    spacingTop: 2,
    spacingHorizontal: 4,
    spacingBottom: 4,
  },
};
