import { FeatureFlag } from './FeatureFlagContext';
import { useFeatureFlags } from './useFeatureFlags';

export function useFeatureFlag(flag: FeatureFlag) {
  const featureFlags = useFeatureFlags();
  return featureFlags[flag];
}
