import memoize from 'lodash/memoize';
import { defaultPalette, frontierSpectrumPalette } from '@cbhq/cds-common/palette/constants';
import { createThemeConfigForSpectrum } from './createThemeConfigForSpectrum';
import { CreateThemeConfigParams } from './ThemeConfig';

export const getCacheKey = ({
  name,
  parentThemeConfig,
  hasFrontier,
}: Omit<CreateThemeConfigParams, 'palette'>) => {
  const parentPrefix = parentThemeConfig ? `${parentThemeConfig.name}-` : '';
  const frontierSuffix = hasFrontier ? `with-frontier` : 'without-frontier';
  return `${parentPrefix}${name}-${frontierSuffix}`;
};

export const createThemeConfig = memoize(function createThemeConfig({
  palette,
  parentThemeConfig,
  name,
  hasFrontier,
}: CreateThemeConfigParams) {
  return {
    name,
    light: createThemeConfigForSpectrum({
      name,
      palette,
      parentThemeConfig,
      spectrum: 'light',
      hasFrontier,
    }),
    dark: createThemeConfigForSpectrum({
      name,
      palette,
      parentThemeConfig,
      spectrum: 'dark',
      hasFrontier,
    }),
  };
},
getCacheKey);

export const defaultThemeConfig = createThemeConfig({
  palette: defaultPalette,
  name: 'default',
});

export const frontierThemeConfig = createThemeConfig({
  palette: frontierSpectrumPalette,
  hasFrontier: true,
  name: 'frontier',
});
