import { renderHook } from '@testing-library/react-hooks';

import { RootScalePreferenceProvider } from '../RootScalePreferenceProvider';
import { ScaleProvider } from '../ScaleProvider';
import { useRootScalePreference } from '../useRootScalePreference';
import { useScale } from '../useScale';

describe('RootScalePreferenceProvider', () => {
  it('defaults to system', () => {
    const { result } = renderHook(() => useRootScalePreference(), {
      wrapper: RootScalePreferenceProvider,
    });
    expect(result.current).toBe('system');
  });

  it('is not impacted by a parent ScaleProvider', () => {
    const { result } = renderHook(() => useRootScalePreference(), {
      wrapper: ({ children }) => (
        <ScaleProvider value="xSmall">
          <RootScalePreferenceProvider value="xxLarge">{children}</RootScalePreferenceProvider>
        </ScaleProvider>
      ),
    });
    expect(result.current).toBe('xxLarge');
  });

  it('can have a different value from ScaleProvider', () => {
    const { result } = renderHook(
      () => {
        return {
          scale: useScale(),
          rootScale: useRootScalePreference(),
        };
      },
      {
        wrapper: ({ children }) => (
          <RootScalePreferenceProvider value="xxLarge">
            <ScaleProvider value="xSmall">{children}</ScaleProvider>
          </RootScalePreferenceProvider>
        ),
      },
    );
    expect(result.current.rootScale).toBe('xxLarge');
    expect(result.current.scale).toBe('xSmall');
  });

  it('logs an error if trying to render multiple RootScalePreferenceProviders', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    renderHook(() => useRootScalePreference(), {
      wrapper: ({ children }) => (
        <RootScalePreferenceProvider value="xxLarge">
          <RootScalePreferenceProvider value="xSmall">{children}</RootScalePreferenceProvider>
        </RootScalePreferenceProvider>
      ),
    });
    expect(spy).toHaveBeenCalledWith(
      'Multiple RootScalePreferenceProviders were rendered and there should only be one. Ensure there is a single RootScalePreferenceProvider to resolve.',
    );
    spy.mockRestore();
  });
});
