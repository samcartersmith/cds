import { renderHook } from '@testing-library/react-hooks';

import { borderRadius as borderRadii } from '../../tokens/border';
import { useInteractableBorderRadius } from '../useInteractableBorderRadius';

describe('useInteractableBorderRadius', () => {
  it('returns zero if undefined is passed in', () => {
    const { result } = renderHook(() => useInteractableBorderRadius());
    expect(result.current).toBe(0);
  });

  it('returns the value if a number is passed in', () => {
    const { result } = renderHook(() => useInteractableBorderRadius(20));
    expect(result.current).toBe(20);
  });

  it('returns the correct value for alias if an alias is passed in', () => {
    const { result } = renderHook(() => useInteractableBorderRadius('standard'));
    expect(result.current).toEqual(borderRadii.standard);
  });
});
