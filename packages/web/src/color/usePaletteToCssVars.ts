import { useMemo } from 'react';
import { usePaletteConfig } from '@cbhq/cds-common';

import { setPaletteConfigToCssVars } from '../utils/palette';

export const usePaletteToCssVars = () => {
  const paletteConfig = usePaletteConfig();
  return useMemo(() => setPaletteConfigToCssVars(paletteConfig), [paletteConfig]);
};
