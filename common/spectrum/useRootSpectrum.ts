import { useContext } from 'react';

import { RootSpectrumContext, DEFAULT_SPECTRUM } from './context';

export const useRootSpectrum = () => {
  const context = useContext(RootSpectrumContext);
  if (process.env.NODE_ENV !== 'production' && !context) {
    console.error('Cannot use `useRootSpectrum` outside of RootSpectrumProvider');
  }
  return context ?? DEFAULT_SPECTRUM;
};
