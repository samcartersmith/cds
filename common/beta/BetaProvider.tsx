import React, { memo, useMemo } from 'react';

import {
  BetaContext,
  DEFAULT_BETA_CONTEXT,
  BetaContextType,
  frontierFeaturesOn,
} from './BetaContext';

export type BetaProviderProps = { features?: Partial<BetaContextType> };
export const BetaProvider: React.FC<BetaProviderProps> = memo(({ features, children }) => {
  const value = useMemo(
    () => ({
      ...DEFAULT_BETA_CONTEXT,
      ...(features?.frontier ? frontierFeaturesOn : {}),
      ...features,
    }),
    [features],
  );
  return <BetaContext.Provider value={value}>{children}</BetaContext.Provider>;
});
