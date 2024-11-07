import { useInteractableHeight } from './useInteractableHeight';

export function useButtonBorderRadius(compact?: boolean) {
  const height = useInteractableHeight(compact);
  return height;
}
