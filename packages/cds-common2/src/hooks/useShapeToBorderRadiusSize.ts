import { ThemeVars } from '../core/theme';
import { borderRadius as borderRadiusTokens } from '../tokens/borderRadius';
import { Shape } from '../types';

import { useShapeToBorderRadiusAlias } from './useShapeToBorderRadiusAlias';

export function useShapeToBorderRadiusSize(shape: Shape) {
  const borderRadius: ThemeVars.BorderRadius | undefined = useShapeToBorderRadiusAlias(shape);
  return borderRadius ? borderRadiusTokens[borderRadius] : 0;
}
