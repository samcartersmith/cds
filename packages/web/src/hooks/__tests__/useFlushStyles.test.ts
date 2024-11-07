import { renderHook } from '@testing-library/react-hooks';

import { useFlushStyles } from '../useFlushStyles';

describe('useFlushStyles.test', () => {
  it('returns flush styles', () => {
    const { result } = renderHook(() => useFlushStyles({ flush: 'start', spacing: { start: 3 } }));

    expect(result.current?.marginLeft).toBe('calc(var(--spacing-3) * -1)');
    expect(result.current?.marginRight).toBe(0);
    expect(result.current?.minWidth).toBe('unset');
  });

  it('returns flush styles for rtl', () => {
    document.documentElement.dir = 'rtl';

    const { result } = renderHook(() => useFlushStyles({ flush: 'start', spacing: { end: 3 } }));

    expect(result.current?.marginRight).toBe('calc(var(--spacing-3) * -1)');
    expect(result.current?.marginLeft).toBe(0);
    expect(result.current?.minWidth).toBe('unset');
  });

  it('returns null if flush is not defined', () => {
    const { result } = renderHook(() => useFlushStyles({ flush: undefined, spacing: { all: 3 } }));

    expect(result.current).toBeNull();
  });
});
