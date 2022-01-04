import { useMemo, useContext } from 'react';

import { FeatureFlagContext, defaultFeatureFlags } from './FeatureFlagContext';

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  return useMemo(() => {
    if (!context) {
      return defaultFeatureFlags;
    }
    return context;
  }, [context]);
};
