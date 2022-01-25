import { useContext } from 'react';

import { DEFAULT_SPECTRUM, SpectrumContext } from './context';

export const useSpectrum = () => {
  const context = useContext(SpectrumContext);
  if (!context) {
    return DEFAULT_SPECTRUM;
  }
  return context;
};
