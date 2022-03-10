import { useContext,useMemo } from 'react';

import { defaultFeatureFlags,FeatureFlagContext } from './FeatureFlagContext';

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  return useMemo(() => {
    if (!context) {
      return defaultFeatureFlags;
    }
    return context;
  }, [context]);
};
