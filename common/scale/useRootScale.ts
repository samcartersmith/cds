import { useContext } from 'react';

import { RootScaleContext, DEFAULT_SCALE } from './context';

export const useRootScale = () => {
  const context = useContext(RootScaleContext);
  if (process.env.NODE_ENV !== 'production' && !context) {
    console.error('Cannot use `useRootScale` outside of RootScaleProvider');
  }
  return context ?? DEFAULT_SCALE;
};
