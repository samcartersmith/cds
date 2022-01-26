import { renderHook } from '@testing-library/react-hooks';

import { innerDefaults, outerDefaults, useCellSpacing } from '../useCellSpacing';

describe('useCellSpacing', () => {
  it('returns correct default spacing', () => {
    const { result } = renderHook(() => {
      return useCellSpacing();
    });

    expect(result.current).toEqual({
      inner: innerDefaults,
      outer: outerDefaults,
    });
  });

  it('returns correct default spacing if deprecated reduceHorizontalSpacing is true', () => {
    const { result } = renderHook(() => {
      return useCellSpacing({ reduceHorizontalSpacing: true });
    });

    expect(result.current).toEqual({
      inner: {
        ...innerDefaults,
        spacingHorizontal: 1, // this is what changes if reduceHorizontalSpacing is true
      },
      outer: outerDefaults,
    });
  });

  it('will correctly override defaults', () => {
    const { result } = renderHook(() => {
      return useCellSpacing({
        innerSpacing: { spacingVertical: 3 },
        outerSpacing: { spacingHorizontal: 0 },
      });
    });

    expect(result.current).toEqual({
      inner: {
        ...innerDefaults,
        spacingVertical: 3,
      },
      outer: {
        ...outerDefaults,
        spacingHorizontal: 0,
      },
    });
  });
});
