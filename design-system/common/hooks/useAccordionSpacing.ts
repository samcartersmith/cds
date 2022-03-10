import { useScaleConditional } from '../scale/useScaleConditional';
import { accordionSpacing } from '../tokens/accordion';

export const useAccordionSpacing = () => {
  return useScaleConditional(accordionSpacing);
};
