import { renderHook } from '@testing-library/react-hooks';

import { useButtonSpacing } from '../useButtonSpacing';

describe('useButtonSpacing', () => {
  it('there is expected change for compact: true or compact:false', () => {
    const { result } = renderHook(() => useButtonSpacing({ compact: true }));
    expect(result.current).toEqual({ start: 2, end: 2 });
    const { result: defaultValue } = renderHook(() => useButtonSpacing({ compact: false }));
    expect(defaultValue.current).toEqual({ start: 4, end: 4 });
  });

  it('returns correct size if flush', () => {
    const { result } = renderHook(() => useButtonSpacing({ compact: true, flush: 'start' }));
    expect(result.current).toEqual({ end: 2, start: 2 });
    const { result: defaultValue } = renderHook(() =>
      useButtonSpacing({ compact: true, flush: 'end' }),
    );
    expect(defaultValue.current).toEqual({ end: 2, start: 2 });
  });
});
