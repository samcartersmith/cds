import { useMemo } from 'react';

import { usePaletteConfig } from '@cbhq/cds-common';

import { paletteConfigToCssVars } from '../utils/palette';

export const usePaletteToCssVars = () => {
  const paletteConfig = usePaletteConfig();
  return useMemo(() => paletteConfigToCssVars(paletteConfig), [paletteConfig]);
};
