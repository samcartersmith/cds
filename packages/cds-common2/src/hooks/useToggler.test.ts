import { renderHook } from '@testing-library/react-hooks';

import { useToggler } from './useToggler';

describe('useToggler', () => {
  it('toggles correctly', () => {
    const { result } = renderHook(() => {
      return useToggler(false);
    });
    expect(result.current[0]).toBe(false);
    result.current[1].toggleOn();
    expect(result.current[0]).toBe(true);
    result.current[1].toggleOff();
    expect(result.current[0]).toBe(false);
    result.current[1].toggle();
    expect(result.current[0]).toBe(true);
  });
});
