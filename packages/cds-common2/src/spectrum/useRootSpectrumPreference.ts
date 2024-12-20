import { useContext } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { RootSpectrumPreferenceContext } from './context';

export const useRootSpectrumPreference = () => {
  const context = useContext(RootSpectrumPreferenceContext);
  if (!isProduction() && !context) {
    // eslint-disable-next-line no-console
    console.error(
      'Cannot use `useRootSpectrumPreference` outside of RootSpectrumPreferenceProvider',
    );
  }
  return context ?? 'system';
};
