import { defaultPaletteOverrides } from '@cbhq/cds-common/palette/constants';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { createThemeConfigForSpectrum } from './createThemeConfigForSpectrum';
import { CreateThemeConfigParams } from './ThemeConfig';

const getCacheKey = ({
  name,
  parentThemeConfig,
}: Pick<CreateThemeConfigParams, 'name' | 'parentThemeConfig' | 'spectrum'>) => {
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
  return createThemeConfig({
    palette: defaultPaletteOverrides,
    name: 'default',
  });
}
