import { useScaleConditional } from '../scale/useScaleConditional';
import { defaultHeight, compactHeight } from '../tokens/interactable';

export function useInteractableHeight(compact?: boolean): number {
  return useScaleConditional(compact ? compactHeight : defaultHeight);
}
