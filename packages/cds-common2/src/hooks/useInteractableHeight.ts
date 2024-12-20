import { useScale } from '../scale/useScale';
import { interactableHeight } from '../tokens/interactableHeight';

export function useInteractableHeight(compact?: boolean): number {
  const scale = useScale();
  const variant = compact ? 'compact' : 'regular';
  return interactableHeight[scale][variant];
}
