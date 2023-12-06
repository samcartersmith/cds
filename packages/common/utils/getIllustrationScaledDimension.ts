import { IllustrationVariant } from '../types/IllustrationNames';
import { IllustrationDimension } from '../types/IllustrationProps';

import { convertDimensionToSize } from './convertDimensionToSize';
import { convertSizeWithMultiplier } from './convertSizeWithMultiplier';

/** @deprecated will be removed in v6.0.0 - please use convertDimensionToSize and convertSizeWithMultiplier */
export const getIllustrationScaledDimension = (
  dimension: IllustrationDimension,
  illustrationType: IllustrationVariant,
  scaleMultiplier?: number,
) => {
  const size = convertDimensionToSize(dimension);
  if (scaleMultiplier) {
    return convertSizeWithMultiplier(size, scaleMultiplier);
  }
  return size;
};
