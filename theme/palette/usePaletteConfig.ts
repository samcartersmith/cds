import * as React from 'react';

import { PaletteConfigContext } from './context';
import { defaultPalette } from './defaultPalette';

export const usePaletteConfig = () => {
  const context = React.useContext(PaletteConfigContext);
  if (!context) {
    return defaultPalette;
  }
  return context;
};
