import { useContext } from 'react';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { PaletteConfig } from '../types/Palette';

import { darkDefaultPalette, defaultPalette as lightDefaultPalette } from './constants';
import { PaletteConfigContext } from './context';

export const usePaletteConfig = (): PaletteConfig => {
  const parentPalette = useContext(PaletteConfigContext);
  const defaultPalette = useSpectrumConditional({
    light: lightDefaultPalette,
    dark: darkDefaultPalette,
  });
  return parentPalette ?? defaultPalette;
};
