import { renderHook } from '@testing-library/react-hooks';

import {
  meetsContrastCriteria,
  getCompliantPaletteValue,
  useCompliantForeground,
} from '../useCompliantForegroundColor';

describe('meetsContrastCriteria', () => {
  it('yellow background with blue text', () => {
    expect(meetsContrastCriteria('yellow', 'blue', 'normalText')).toBe(true);
  });

  it('yellow background with yellow text', () => {
    expect(meetsContrastCriteria('yellow', 'yellow', 'normalText')).toBe(false);
  });
});

describe('getCompliantPaletteValue', () => {
  const whiteAsHsl = '#ffffff';
  const blackAsHsl = '#000000';
  const blueAsHsl = '#3498DB';
  it('returns the correct paletteValue', () => {
    expect(getCompliantPaletteValue(whiteAsHsl)).toBe('gray100');
    expect(getCompliantPaletteValue(blackAsHsl)).toBe('gray100');
    expect(getCompliantPaletteValue(blueAsHsl)).toBe('blue60');
  });
});

describe('useCompliantForeground', () => {
  it('returns the correct value for compliant color', () => {
    const { result } = renderHook(() => useCompliantForeground('#ffffff', '#000000', 'graphics'));

    expect(result.current.value).toEqual('#000000');
    expect(result.current.type).toEqual('color');
  });

  it('returns the closest paletteValue for non compliant color', () => {
    const { result } = renderHook(() => useCompliantForeground('#ffffff', '#fff000', 'graphics'));

    expect(result.current.value).toEqual('yellow60');
    expect(result.current.type).toEqual('paletteValue');
  });

  it('returns gray100 for non compliant gray colors', () => {
    const { result } = renderHook(() => useCompliantForeground('#ffffff', '#dddddd', 'graphics'));

    expect(result.current.value).toEqual('gray100');
    expect(result.current.type).toEqual('paletteValue');
  });
});
