import { useContext } from 'react';

import { ScaleContext } from './context';

export const useScale = () => {
  return useContext(ScaleContext);
};
