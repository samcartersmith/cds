import { UsePaletteFn } from '@cbhq/cds-common';
import { useThemeConfig } from '../system/useThemeConfig';

export const usePalette: UsePaletteFn = () => {
  return useThemeConfig().activeConfig.rgbaStrings;
};
