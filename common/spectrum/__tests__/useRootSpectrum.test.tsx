import { renderHook } from '@testing-library/react-hooks';

import { RootSpectrumProvider } from '../RootSpectrumProvider';
import { useRootSpectrum } from '../useRootSpectrum';

describe('useRootSpectrum', () => {
  it('returns correct value', () => {
    for (const spectrum of ['light', 'dark'] as const) {
      const { result } = renderHook(() => useRootSpectrum(), {
        wrapper: ({ children }) => (
          <RootSpectrumProvider value={spectrum}>{children}</RootSpectrumProvider>
        ),
      });
      expect(result.current).toBe(spectrum);
    }
  });

  it('returns light by default', () => {
    const { result } = renderHook(() => useRootSpectrum(), {
      wrapper: RootSpectrumProvider,
    });
    expect(result.current).toBe('light');
  });

  it('logs an error if accessed outside of RootSpectrumProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useRootSpectrum());
    expect(result.current).toBe('light');
    expect(spy).toHaveBeenCalledWith(
      'Cannot use `useRootSpectrum` outside of RootSpectrumProvider',
    );
    spy.mockRestore();
  });
});
