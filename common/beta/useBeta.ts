import { useContext } from 'react';

import { BetaContext, DEFAULT_BETA_CONTEXT } from './BetaContext';

export const useBeta = () => {
  const context = useContext(BetaContext);
  if (!context) {
    return DEFAULT_BETA_CONTEXT;
  }
  return context;
};
