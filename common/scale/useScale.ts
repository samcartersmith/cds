import { useContext } from 'react';

import { ScaleContext, DEFAULT_SCALE } from './context';

export const useScale = () => {
  const context = useContext(ScaleContext);
  if (!context) {
    return DEFAULT_SCALE;
  }
  return context;
};
