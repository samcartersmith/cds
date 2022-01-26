import React, { memo } from 'react';

import { FeatureFlagProvider, FeatureFlagProviderProps } from '../system/FeatureFlagProvider';

/** @deprecated BetaProviderProps has been renamed to FeatureFlagProviderProps and moved to common/system directory */
export type BetaProviderProps = { features?: FeatureFlagProviderProps };

/** @deprecated BetaProvider has been renamed to FeatureFlagProvider and moved to common/system directory */
export const BetaProvider: React.FC<BetaProviderProps> = memo(({ features, children }) => {
  return <FeatureFlagProvider {...features}>{children}</FeatureFlagProvider>;
});
