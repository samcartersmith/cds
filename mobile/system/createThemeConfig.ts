import { memoize } from '@cbhq/cds-common/utils/memoize';
import { defaultPalette, frontierSpectrumPalette } from '@cbhq/cds-common/palette/constants';
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
  hasFrontier,
}: CreateThemeConfigParams) {
  const name = getCacheKey({ name: nameProp, parentThemeConfig });
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

export function createFallbackThemeConfig(hasFrontier?: boolean) {
  if (hasFrontier) {
    return createThemeConfig({
      palette: frontierSpectrumPalette,
      hasFrontier: true,
      name: 'frontier',
    });
  }
  return createThemeConfig({
    palette: defaultPalette,
    name: 'default',
  });
}
