import { borderRadius as borderRadii } from '../tokens/border';
import { InteractableBaseProps } from '../types/InteractableBaseProps';

export function useInteractableBorderRadius(borderRadius?: InteractableBaseProps['borderRadius']) {
  if (borderRadius === undefined) return 0;
  if (typeof borderRadius === 'number') return borderRadius;
  return borderRadii[borderRadius];
}
