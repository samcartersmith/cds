import { borderRadius as borderRadiusTokens } from '../tokens/borderRadius';
import { BorderRadius, Shape } from '../types';

import { useShapeToBorderRadiusAlias } from './useShapeToBorderRadiusAlias';

export function useShapeToBorderRadiusSize(shape: Shape) {
  const borderRadius: BorderRadius | undefined = useShapeToBorderRadiusAlias(shape);
  return borderRadius ? borderRadiusTokens[borderRadius] : 0;
}
