import { useMemo } from 'react';

import { usePaletteConfig } from '@cbhq/cds-common';
import { mapKeys, toCssVar } from '@cbhq/cds-utils';

import { paletteConfigToCssVars } from '../utils/palette';

export const usePaletteToCssVars = () => {
  const paletteConfig = usePaletteConfig();
  return useMemo(() => {
    return mapKeys(paletteConfigToCssVars(paletteConfig), (_, key) => toCssVar(String(key)));
  }, [paletteConfig]);
};
