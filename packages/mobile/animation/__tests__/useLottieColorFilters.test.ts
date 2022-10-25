import { ComponentProps } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import LottieView from 'lottie-react-native';
import { defaultPalette } from '@cbhq/cds-common';
import { colorToHex } from '@cbhq/cds-common/color/colorToHex';
import { globalTradeButton } from '@cbhq/cds-lottie-files/globalTradeButton';

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
  it('ensures the color values are mapped to hex version of palette colors', () => {
    const result = renderHook(() => useLottieColorFilters(globalTradeButton)).result.current;

    expect(getPaletteColors(result)).toContain(colorToHex(mockPalette.primaryForeground));
  });

  it('ensures the palette aliases are mapped to palette names', () => {
    const result = renderHook(() => useLottieColorFilters(globalTradeButton)).result.current;

    expect(getPaletteAliases(result)).toContain('palette_primaryForeground');
  });
});
