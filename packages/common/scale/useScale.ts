import { useContext } from 'react';

import { DEFAULT_SCALE, ScaleContext } from './context';

export const useScale = () => {
  const context = useContext(ScaleContext);
  if (!context) {
    return DEFAULT_SCALE;
  }
  return context;
};
