import { useState } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { usePreviousValue } from '../usePreviousValue';

describe('usePreviousValue', () => {
  const useMockPreviousValue = () => {
    const [currentValue, setCurrentValue] = useState(false);
    const previousValue = usePreviousValue(currentValue);
    return {
      setCurrentValue,
      previousValue,
      currentValue,
    };
  };

  it('returns the previous value when input changes', () => {
    const { result } = renderHook(() => useMockPreviousValue());
    expect(result.current.previousValue).toBeUndefined();
    expect(result.current.currentValue).toBe(false);
    result.current.setCurrentValue(true);
    expect(result.current.previousValue).toBe(false);
    expect(result.current.currentValue).toBe(true);
    result.current.setCurrentValue(false);
    expect(result.current.previousValue).toBe(true);
    expect(result.current.currentValue).toBe(false);
    result.current.setCurrentValue(false);
    expect(result.current.previousValue).toBe(false);
    expect(result.current.currentValue).toBe(false);
  });
});
