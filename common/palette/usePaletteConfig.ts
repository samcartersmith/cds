import { useContext } from 'react';

import { PaletteConfig } from '../types/Palette';
import { defaultPalette } from './constants';
import { PaletteConfigContext } from './context';

export const usePaletteConfig = (): PaletteConfig => {
  const context = useContext(PaletteConfigContext);
  if (!context) {
    return defaultPalette;
  }
  return context;
};
