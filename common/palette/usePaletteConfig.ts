import { useContext } from 'react';

import { defaultPalette } from './constants';
import { PaletteConfigContext } from './context';

export const usePaletteConfig = () => {
  const context = useContext(PaletteConfigContext);
  if (!context) {
    return defaultPalette;
  }
  return context;
};
