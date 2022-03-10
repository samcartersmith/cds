import type { IllustrationDimension } from '../types';
import { illustrationSizes } from '../tokens/illustrations';

/** Returns the aspect ratio tuple for a given dimension */
export function convertDimensionToAspectRatio(dimension: IllustrationDimension) {
  return illustrationSizes[dimension];
}
