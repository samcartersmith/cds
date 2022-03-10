import { useContext } from 'react';

import { SpectrumContext, DEFAULT_SPECTRUM } from './context';

export const useSpectrum = () => {
  const context = useContext(SpectrumContext);
  if (!context) {
    return DEFAULT_SPECTRUM;
  }
  return context;
};
