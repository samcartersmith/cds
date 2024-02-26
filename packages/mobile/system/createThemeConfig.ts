import { useSpectrum } from '@cbhq/cds-common';
import { darkDefaultPalette, defaultPalette } from '@cbhq/cds-common/palette/constants';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { createThemeConfigForSpectrum } from './createThemeConfigForSpectrum';
import { CreateThemeConfigParams } from './ThemeConfig';

const getCacheKey = ({
  name,
  parentThemeConfig,
}: Pick<CreateThemeConfigParams, 'name' | 'parentThemeConfig'>) => {
  const parent = parentThemeConfig ? `${parentThemeConfig.name}-` : '';
  return `${parent}${name}`;
};

export const createThemeConfig = memoize(function createThemeConfig({
  palette,
  parentThemeConfig,
  name: nameProp,
}: CreateThemeConfigParams) {
  const name = getCacheKey({ name: nameProp, parentThemeConfig });
  return {
    name,
    light: createThemeConfigForSpectrum({
      name,
      palette,
      parentThemeConfig,
      spectrum: 'light',
    }),
    dark: createThemeConfigForSpectrum({
      name,
      palette,
      parentThemeConfig,
      spectrum: 'dark',
    }),
  };
},
getCacheKey);

export function useFallbackThemeConfig() {
  const spectrum = useSpectrum();
  return createThemeConfig({
    palette: spectrum === 'dark' ? darkDefaultPalette : defaultPalette,
    name: 'default',
  });
}
