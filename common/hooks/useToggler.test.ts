import { act, renderHook } from '@testing-library/react-hooks';

import { useToggler } from './useToggler';

describe('useToggler', () => {
  it('toggles correctly', () => {
    const { result } = renderHook(() => {
      return useToggler(false);
    });
    expect(result.current.isToggled).toBe(false);
    act(() => result.current.toggleOn());
    expect(result.current.isToggled).toEqual(true);
    act(() => result.current.toggleOff());
    expect(result.current.isToggled).toEqual(false);
    act(() => result.current.toggle());
    expect(result.current.isToggled).toEqual(true);
  });
});
