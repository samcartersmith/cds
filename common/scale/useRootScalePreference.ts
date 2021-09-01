import { useContext } from 'react';

import { RootScalePreferenceContext } from './context';

export const useRootScalePreference = () => {
  const context = useContext(RootScalePreferenceContext);
  if (process.env.NODE_ENV !== 'production' && !context) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `useRootScalePreference` outside of RootScalePreferenceProvider');
  }
  return context ?? 'system';
};
