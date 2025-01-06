import { renderHook } from '@testing-library/react-hooks';

import { usePinBorderRadiusStyles } from '../usePinBorderRadiusStyles';

describe('usePinBorderRadiusStyles', () => {
  it('overrides top border radius if pinned to top', () => {
    const { result } = renderHook(() => usePinBorderRadiusStyles('top', 200));
    expect(result.current).toEqual({
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopWidth: 0,
    });
  });
  it('overrides right border radius if pinned to right', () => {
    const { result } = renderHook(() => usePinBorderRadiusStyles('right', 200));
    expect(result.current).toEqual({
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      borderRightWidth: 0,
    });
  });
  it('overrides bottom border radius if pinned to bottom', () => {
    const { result } = renderHook(() => usePinBorderRadiusStyles('bottom', 200));
    expect(result.current).toEqual({
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomWidth: 0,
    });
  });
  it('overrides left border radius if pinned to left', () => {
    const { result } = renderHook(() => usePinBorderRadiusStyles('left', 200));
    expect(result.current).toEqual({
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeftWidth: 0,
    });
  });

  it('returns empty object if borderRadius is not passed in', () => {
    const { result } = renderHook(() => usePinBorderRadiusStyles('left'));
    expect(result.current).toEqual({});
  });

  it('returns empty object if pin is not passed in', () => {
    const { result } = renderHook(() => usePinBorderRadiusStyles(undefined, 200));
    expect(result.current).toEqual({});
  });
});
