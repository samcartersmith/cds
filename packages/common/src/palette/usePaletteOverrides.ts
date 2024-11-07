import { useContext } from 'react';

import { PaletteOverridesContext } from './context';

export const usePaletteOverrides = () => {
  const paletteOverrides = useContext(PaletteOverridesContext);

  return paletteOverrides;
};
