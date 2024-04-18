import { useSpectrum } from '@cbhq/cds-common';
import { darkDefaultPalette, defaultPalette } from '@cbhq/cds-common/palette/constants';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { createThemeConfigForSpectrum } from './createThemeConfigForSpectrum';
import { CreateThemeConfigParams } from './ThemeConfig';

const getCacheKey = ({
  name,
  spectrum,
  parentThemeConfig,
}: Pick<CreateThemeConfigParams, 'name' | 'parentThemeConfig' | 'spectrum'>) => {
  const parent = parentThemeConfig ? `${parentThemeConfig.name}-` : '';
  const spectrumKey = spectrum ? `-${spectrum}` : '';
  return `${parent}${name}${spectrumKey}`;
};

export const createThemeConfig = memoize(function createThemeConfig({
  palette,
  spectrum,
  parentThemeConfig,
  name: nameProp,
}: CreateThemeConfigParams) {
  const name = getCacheKey({ name: nameProp, parentThemeConfig, spectrum });
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
    spectrum,
    name: 'default',
  });
}
