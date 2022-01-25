import { useScale } from '../scale/useScale';
import { useScaleConditional } from '../scale/useScaleConditional';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { compactHeight, defaultHeight } from '../tokens/interactable';
import { interactableHeight } from '../tokens/interactableHeight';

export function useInteractableHeight(compact?: boolean): number {
  const scale = useScale();
  const hasFrontier = useFeatureFlag('frontierButton');
  const deprecatedHeight = useScaleConditional(compact ? compactHeight : defaultHeight);
  if (hasFrontier) {
    const variant = compact ? 'compact' : 'regular';
    return interactableHeight[scale][variant];
  }
  return deprecatedHeight;
}
