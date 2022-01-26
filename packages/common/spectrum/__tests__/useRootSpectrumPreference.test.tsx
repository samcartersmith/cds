import { renderHook } from '@testing-library/react-hooks';

import { RootSpectrumPreferenceProvider } from '../RootSpectrumPreferenceProvider';
import { useRootSpectrumPreference } from '../useRootSpectrumPreference';

describe('useRootSpectrumPreference', () => {
  it('returns correct value', () => {
    for (const spectrum of ['light', 'dark', 'system'] as const) {
      const { result } = renderHook(() => useRootSpectrumPreference(), {
        wrapper: ({ children }) => (
          <RootSpectrumPreferenceProvider value={spectrum}>
            {children}
          </RootSpectrumPreferenceProvider>
        ),
      });
      expect(result.current).toBe(spectrum);
    }
  });

  it('returns system by default', () => {
    const { result } = renderHook(() => useRootSpectrumPreference(), {
      wrapper: RootSpectrumPreferenceProvider,
    });
    expect(result.current).toBe('system');
  });

  it('logs an error if accessed outside of RootSpectrumBaseProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useRootSpectrumPreference());
    expect(result.current).toBe('system');
    expect(spy).toHaveBeenCalledWith(
      'Cannot use `useRootSpectrumPreference` outside of RootSpectrumPreferenceProvider',
    );
    spy.mockRestore();
  });
});
