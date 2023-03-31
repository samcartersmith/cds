import { useFeatureFlag } from '../system/useFeatureFlag';

import { useInteractableHeight } from './useInteractableHeight';

export function useButtonBorderRadius(compact?: boolean) {
  const height = useInteractableHeight(compact);
  const hasFrontier = useFeatureFlag('frontierButton');
  if (hasFrontier) return height;
  return compact ? 'roundedSmall' : 'rounded';
}
