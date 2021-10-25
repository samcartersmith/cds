import { useContext } from 'react';

import { FeatureFlagContext, defaultFeatureFlags } from './FeatureFlagContext';

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    return defaultFeatureFlags;
  }
  return context;
};
