import { useContext } from 'react';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { PaletteConfig } from '../types/Palette';

import { darkDefaultPalette, defaultPalette } from './constants';
import { PaletteConfigContext } from './context';

export const usePaletteConfig = (): PaletteConfig => {
  const context = useContext(PaletteConfigContext);
  const paletteDefaults = useSpectrumConditional({
    light: defaultPalette,
    dark: darkDefaultPalette,
  });
  return context ?? paletteDefaults;
};
