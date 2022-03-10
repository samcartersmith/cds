import { useFeatureFlag } from '../system/useFeatureFlag';
import { useScaleConditional } from '../scale/useScaleConditional';
import { defaultHeight, compactHeight } from '../tokens/interactable';
import { interactableHeight } from '../tokens/interactableHeight';
import { useScale } from '../scale/useScale';

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
