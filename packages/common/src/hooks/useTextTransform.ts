import { useScaleDensity } from '../scale/useScaleDensity';
import { TextTransform, Typography } from '../types';

export const variantsWithTransforms = {
  dense: new Set<Typography>(['caption']),
  normal: new Set<Typography>(['caption']),
};

export function useTextTransform(name: Typography, override?: TextTransform) {
  const scaleDensity = useScaleDensity();
  const transformsForScale = variantsWithTransforms[scaleDensity];
  if (override) return override;

  if (transformsForScale.has(name)) {
    return 'uppercase';
  }

  return undefined;
}
