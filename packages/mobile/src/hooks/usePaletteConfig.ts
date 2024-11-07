import { PaletteConfig } from '@cbhq/cds-common';

import { useThemeConfig } from '../system/useThemeConfig';

export const usePaletteConfig: () => PaletteConfig = () => {
  return useThemeConfig().activeConfig.palette;
};
