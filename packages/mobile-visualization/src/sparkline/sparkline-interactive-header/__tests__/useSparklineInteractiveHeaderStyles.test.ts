import { StyleProp, TextStyle } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import { defaultPalette } from '@cbhq/cds-common';
import { paletteConfigToRgbaStrings } from '@cbhq/cds-mobile/utils/palette';

import { useSparklineInteractiveHeaderStyles } from '../useSparklineInteractiveHeaderStyles';

const getStyleValue = (styles: StyleProp<TextStyle>, styleProp: keyof TextStyle) =>
  (styles as TextStyle[]).reverse().find((item: TextStyle) => item?.[styleProp])?.[styleProp];

const lightPalette = paletteConfigToRgbaStrings(defaultPalette, 'light');

describe('useSparklineInteractiveHeaderStyles', () => {
  it('adjusts calculated width based on text length', () => {
    const { result } = renderHook(() => useSparklineInteractiveHeaderStyles());
    const styles1 = result.current.title('$1,000');
    // Uses default fontSize if less than 12 characters
    expect(getStyleValue(styles1, 'fontSize')).toBe(28);
    // Calculates fontSize if > 12 characters
    const styles2 = result.current.title('$1,110,000.12');
    expect(getStyleValue(styles2, 'fontSize')).toBeLessThan(28);
  });

  it('sets correct styles for positive subHead (percent change)', () => {
    const { result } = renderHook(() => useSparklineInteractiveHeaderStyles());
    const subHeadIconStyles = result.current.subHead('positive');
    expect(getStyleValue(subHeadIconStyles, 'color')).toBe(lightPalette.positive);

    const subHeadStyles = result.current.subHead('positive');
    expect(getStyleValue(subHeadStyles, 'color')).toBe(lightPalette.positive);
  });

  it('sets correct styles for negative subHead (percent change)', () => {
    const { result } = renderHook(() => useSparklineInteractiveHeaderStyles());
    const subHeadIconStyles = result.current.subHead('negative');
    expect(getStyleValue(subHeadIconStyles, 'color')).toBe(lightPalette.negative);

    const subHeadStyles = result.current.subHead('negative');
    expect(getStyleValue(subHeadStyles, 'color')).toBe(lightPalette.negative);
  });
});
