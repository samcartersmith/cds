import { renderHook } from '@testing-library/react-hooks';

import { RootSpectrumPreferenceProvider } from '../RootSpectrumPreferenceProvider';
import { SpectrumProvider } from '../SpectrumProvider';
import { useRootSpectrumPreference } from '../useRootSpectrumPreference';

describe('RootSpectrumPreferenceProvider', () => {
  it('defaults to large', () => {
    const { result } = renderHook(() => useRootSpectrumPreference(), {
      wrapper: RootSpectrumPreferenceProvider,
    });
    expect(result.current).toBe('system');
  });

  it('is not impacted by a parent SpectrumProvider', () => {
    const { result } = renderHook(() => useRootSpectrumPreference(), {
      wrapper: ({ children }) => (
        <SpectrumProvider value="light">
          <RootSpectrumPreferenceProvider value="dark">{children}</RootSpectrumPreferenceProvider>
        </SpectrumProvider>
      ),
    });
    expect(result.current).toBe('dark');
  });

  it('can have a different value from SpectrumProvider', () => {
    const { result } = renderHook(
      () => {
        return {
          rootSpectrum: useRootSpectrumPreference(),
        };
      },
      {
        wrapper: ({ children }) => (
          <RootSpectrumPreferenceProvider value="dark">
            <SpectrumProvider value="light">{children}</SpectrumProvider>
          </RootSpectrumPreferenceProvider>
        ),
      },
    );
    expect(result.current.rootSpectrum).toBe('dark');
  });

  it('logs an error if trying to render multiple RootSpectrumPreferenceProviders', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    renderHook(() => useRootSpectrumPreference(), {
      wrapper: ({ children }) => (
        <RootSpectrumPreferenceProvider value="dark">
          <RootSpectrumPreferenceProvider value="light">{children}</RootSpectrumPreferenceProvider>
        </RootSpectrumPreferenceProvider>
      ),
    });
    expect(spy).toHaveBeenCalledWith(
      'Multiple RootSpectrumPreferenceProviders were rendered and there should only be one. Ensure there is a single RootSpectrumPreferenceProvider to resolve.',
    );
    spy.mockRestore();
  });
});
