import React, { memo, useMemo } from 'react';

import { BetaContext, DEFAULT_CONTEXT_VALUE, BetaContextType } from './BetaContext';

export type BetaProviderProps = { features?: Partial<BetaContextType> };
export const BetaProvider: React.FC<BetaProviderProps> = memo(({ features, children }) => {
  const value = useMemo(() => ({ ...DEFAULT_CONTEXT_VALUE, ...features }), [features]);
  return <BetaContext.Provider value={value}>{children}</BetaContext.Provider>;
});
