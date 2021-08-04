/* eslint-disable @typescript-eslint/no-floating-promises */

import { act, renderHook } from '@testing-library/react-hooks';

import { useToggler } from './useToggler';

describe('useToggler', () => {
  it('toggles correctly', () => {
    const { result } = renderHook(() => {
      return useToggler(false);
    });
    expect(result.current[0]).toBe(false);
    act(() => result.current[1].toggleOn());
    expect(result.current[0]).toEqual(true);
    act(() => result.current[1].toggleOff());
    expect(result.current[0]).toEqual(false);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toEqual(true);
  });
});
