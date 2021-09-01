import { useContext } from 'react';

import { RootSpectrumPreferenceContext } from './context';

export const useRootSpectrumPreference = () => {
  const context = useContext(RootSpectrumPreferenceContext);
  if (process.env.NODE_ENV !== 'production' && !context) {
    // eslint-disable-next-line no-console
    console.error(
      'Cannot use `useRootSpectrumPreference` outside of RootSpectrumPreferenceProvider',
    );
  }
  return context ?? 'system';
};
