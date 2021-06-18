/* eslint-disable react/display-name */
import { renderHook } from '@testing-library/react-hooks';

import { RootScaleProvider } from '../RootScaleProvider';
import { useRootScale } from '../useRootScale';

describe('useRootScale', () => {
  it('returns correct value', () => {
    for (const scale of [
      'xSmall',
      'small',
      'medium',
      'large',
      'xLarge',
      'xxLarge',
      'xxxLarge',
    ] as const) {
      const { result } = renderHook(() => useRootScale(), {
        wrapper: ({ children }) => <RootScaleProvider value={scale}>{children}</RootScaleProvider>,
      });
      expect(result.current).toBe(scale);
    }
  });

  it('returns large by default', () => {
    const { result } = renderHook(() => useRootScale(), {
      wrapper: RootScaleProvider,
    });
    expect(result.current).toBe('large');
  });

  it('logs an error if accessed outside of RootScaleProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useRootScale());
    expect(result.current).toBe('large');
    expect(spy).toHaveBeenCalledWith('Cannot use `useRootScale` outside of RootScaleProvider');
    spy.mockRestore();
  });
});
