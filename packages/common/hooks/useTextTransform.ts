import { useScaleDensity } from '../scale/useScaleDensity';
import { TextTransform, Typography } from '../types';

export const denseTextTransforms = new Set<Typography>(['label1', 'label2', 'caption']);
export const normalTextTransforms = new Set<Typography>(['caption']);

export const variantsWithTransforms = {
  dense: denseTextTransforms,
  normal: normalTextTransforms,
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
