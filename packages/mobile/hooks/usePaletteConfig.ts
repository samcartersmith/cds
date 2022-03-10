import { useThemeConfig } from '../system/useThemeConfig';

export const usePaletteConfig = () => {
  return useThemeConfig().activeConfig.palette;
};
