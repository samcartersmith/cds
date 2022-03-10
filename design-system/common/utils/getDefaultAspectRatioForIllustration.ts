import type { IllustrationVariant } from '../types';
import { illustrationDimensionDefaults, illustrationSizes } from '../tokens/illustrations';

/** Returns the default aspect ratio tuple for an illustration variant */
export function getDefaultAspectRatioForIllustration(variant: IllustrationVariant) {
  const dimensions = illustrationDimensionDefaults[variant];
  return illustrationSizes[dimensions];
}
