import * as React from 'react';

import { SpectrumContext, DEFAULT_SPECTRUM } from './context';

export const useSpectrum = () => {
  const context = React.useContext(SpectrumContext);
  if (!context) {
    return DEFAULT_SPECTRUM;
  }
  return context;
};
