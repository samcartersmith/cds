import { SpacingScale, ScaleDensity } from '../types';

export const collapseSpacing: Record<
  ScaleDensity,
  Record<'inner' | 'outer', Record<string, SpacingScale>>
> = {
  normal: {
    inner: { spacingHorizontal: 3, spacingBottom: 3 },
    outer: { spacingTop: 2 },
  },
  dense: {
    inner: { spacingHorizontal: 4, spacingBottom: 4 },
    outer: { spacingTop: 2 },
  },
};
