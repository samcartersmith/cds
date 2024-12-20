import { renderHook } from '@testing-library/react-hooks';

import { usePreviousValue } from '../usePreviousValue';
import { useToggler } from '../useToggler';

describe('usePreviousValue', () => {
  const useMockPreviousValue = () => {
    const [currentValue, toggles] = useToggler();
    const previousValue = usePreviousValue(currentValue);
    return {
      ...toggles,
      previousValue,
      currentValue,
    };
  };

  it('returns the previous value when input changes', () => {
    const { result } = renderHook(() => useMockPreviousValue());
    expect(result.current.previousValue).toBeUndefined();
    expect(result.current.currentValue).toBe(false);
    result.current.toggleOn();
    expect(result.current.previousValue).toBe(false);
    expect(result.current.currentValue).toBe(true);
    result.current.toggleOff();
    expect(result.current.previousValue).toBe(true);
    expect(result.current.currentValue).toBe(false);
    result.current.toggleOff();
    expect(result.current.previousValue).toBe(false);
    expect(result.current.currentValue).toBe(false);
  });
});
