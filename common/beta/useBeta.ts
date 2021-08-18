import { useContext } from 'react';

import { BetaContext, DEFAULT_CONTEXT_VALUE } from './BetaContext';

export const useBeta = () => {
  const context = useContext(BetaContext);
  if (!context) {
    return DEFAULT_CONTEXT_VALUE;
  }
  return context;
};
