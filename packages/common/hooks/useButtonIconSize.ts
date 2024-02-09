import { useScaleConditional } from '../scale/useScaleConditional';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { IconSize } from '../types';

export function useButtonIconSize(compact?: boolean) {
  const hasFrontier = useFeatureFlag('frontierButton');
  const compactSize: IconSize = useScaleConditional({ dense: 'm', normal: 's' });
  if (hasFrontier) return compact ? compactSize : 'm';
  return compact ? 'xs' : 's';
}
