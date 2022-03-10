import { useContext } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { DEFAULT_SPECTRUM,RootSpectrumContext } from './context';

export const useRootSpectrum = () => {
  const context = useContext(RootSpectrumContext);
  if (!isProduction() && !context) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `useRootSpectrum` outside of RootSpectrumProvider');
  }
  return context ?? DEFAULT_SPECTRUM;
};
