import { ComponentProps } from 'react';

import { defaultPalette } from '@cbhq/cds-common';
import { activityIndicator } from '@cbhq/cds-lottie-files/activityIndicator';
import { rgba2hex } from '@cbhq/cds-utils';
import { renderHook } from '@testing-library/react-hooks';
import LottieView from 'lottie-react-native';

import { convertPalette } from '../../utils/convertPalette';
import { useLottieColorFilters } from '../useLottieColorFilters';

type LottieComponent = typeof LottieView;
type ColorFiltersProp = ComponentProps<LottieComponent>['colorFilters'];
const mockPalette = convertPalette(defaultPalette, 'light');

const getPaletteAliases = (colorFilters: ColorFiltersProp = []) => {
  return colorFilters.map(item => item.keypath);
};

const getPaletteColors = (colorFilters: ColorFiltersProp = []) => {
  return colorFilters.map(item => item.color);
};

describe('useLottieColorFilters', () => {
  let result: ColorFiltersProp = [];

  beforeEach(() => {
    result = renderHook(() => useLottieColorFilters(activityIndicator)).result.current;
  });

  it('ensures the color values are mapped to hex version of palette colors', () => {
    expect(getPaletteColors(result).includes(rgba2hex(mockPalette.foregroundMuted))).toEqual(true);
  });

  it('ensures the palette aliases are mapped to palette names', () => {
    expect(getPaletteAliases(result).includes('palette_foregroundMuted')).toEqual(true);
  });
});
