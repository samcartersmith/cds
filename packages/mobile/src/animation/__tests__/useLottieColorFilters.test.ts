import { ComponentProps } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import LottieView from 'lottie-react-native';
import { defaultPalette } from '@cbhq/cds-common';
import { colorToHex } from '@cbhq/cds-common/src/color/colorToHex';
import { activityIndicator } from '@cbhq/cds-lottie-files/src/activityIndicator';

import { paletteConfigToRgbaStrings } from '../../utils/palette';
import { useLottieColorFilters } from '../useLottieColorFilters';

type LottieComponent = typeof LottieView;
type ColorFiltersProp = ComponentProps<LottieComponent>['colorFilters'];
const mockPalette = paletteConfigToRgbaStrings(defaultPalette, 'light');

const getPaletteAliases = (colorFilters: ColorFiltersProp = []) => {
  return colorFilters.map((item) => item.keypath);
};

const getPaletteColors = (colorFilters: ColorFiltersProp = []) => {
  return colorFilters.map((item) => item.color);
};

describe('useLottieColorFilters', () => {
  let result: ColorFiltersProp = [];

  beforeEach(() => {
    result = renderHook(() => useLottieColorFilters(activityIndicator)).result.current;
  });

  it('ensures the color values are mapped to hex version of palette colors', () => {
    expect(getPaletteColors(result)).toContain(colorToHex(mockPalette.foregroundMuted));
  });

  it('ensures the palette aliases are mapped to palette names', () => {
    expect(getPaletteAliases(result)).toContain('palette_foregroundMuted');
  });
});
