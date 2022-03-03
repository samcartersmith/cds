import { useScaleConditional } from '../scale/useScaleConditional';
import { collapseSpacing } from '../tokens/collapse';

export const useCollapseSpacing = () => {
  return useScaleConditional(collapseSpacing);
};
