import { useContext } from 'react';

import { SpectrumContext } from './context';

export const useSpectrum = () => {
  return useContext(SpectrumContext);
};
