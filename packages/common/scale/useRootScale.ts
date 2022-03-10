import { useContext } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { DEFAULT_SCALE,RootScaleContext } from './context';

export const useRootScale = () => {
  const context = useContext(RootScaleContext);
  if (isProduction() && !context) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `useRootScale` outside of RootScaleProvider');
  }
  return context ?? DEFAULT_SCALE;
};
