import { borderRadius as borderRadii } from '../tokens/border';
import { Shape } from '../types';
import { useShapeToBorderRadiusAlias } from './useShapeToBorderRadiusAlias';

export function useShapeToBorderRadiusSize(shape: Shape) {
  const borderRadiusType = useShapeToBorderRadiusAlias(shape);
  return borderRadiusType ? borderRadii[borderRadiusType] : 0;
}
