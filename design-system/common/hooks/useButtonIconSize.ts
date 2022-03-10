import { useFeatureFlag } from '../system/useFeatureFlag';

export function useButtonIconSize(compact?: boolean) {
  const hasFrontier = useFeatureFlag('frontierButton');
  if (hasFrontier) return compact ? 's' : 'm';
  return compact ? 'xs' : 's';
}
