import React, { memo, useMemo } from 'react';
import {
  FeatureFlags,
  FeatureFlagContext,
  defaultFeatureFlags,
  frontierFeaturesOn,
} from './FeatureFlagContext';

export type FeatureFlagProviderProps = Partial<FeatureFlags>;

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = memo(
  ({ children, ...features }) => {
    const value = useMemo(
      () => ({
        ...defaultFeatureFlags,
        ...(features?.frontier ? frontierFeaturesOn : {}),
        ...features,
      }),
      [features],
    );
    return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>;
  },
);
