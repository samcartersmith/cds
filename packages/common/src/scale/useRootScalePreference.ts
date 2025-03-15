import { useContext } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { RootScalePreferenceContext } from './context';

export const useRootScalePreference = () => {
  const context = useContext(RootScalePreferenceContext);
  if (!isProduction() && !context) {
    console.error('Cannot use `useRootScalePreference` outside of RootScalePreferenceProvider');
  }
  return context ?? 'system';
};
