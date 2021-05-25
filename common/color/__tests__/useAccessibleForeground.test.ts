import { renderHook } from '@testing-library/react-hooks';

import { PaletteValue } from '../../types';
import { useAccessibleForeground } from '../useAccessibleForeground';

describe('useAccessibleForeground', () => {
  const transformFn = jest.fn((value: PaletteValue) =>
    typeof value === 'string' ? value : `${value[0]},${value[1]}`
  );

  it('returns the color passed in if meets accessibility requirements', () => {
    const { result } = renderHook(() =>
      useAccessibleForeground('#ffffff', '#000000', 'graphic', transformFn)
    );

    expect(result.current).toEqual('#000000');
  });

  it('returns the closest spectrum color if it does not meet accessibility requirements', () => {
    const { result } = renderHook(() =>
      useAccessibleForeground('#ffffff', '#fff000', 'graphic', transformFn)
    );

    expect(result.current).toEqual('yellow50');
  });

  it('returns gray100 for non accessible gray colors', () => {
    const { result } = renderHook(() =>
      useAccessibleForeground('#ffffff', '#dddddd', 'graphic', transformFn)
    );

    expect(result.current).toEqual('gray100');
  });
});
