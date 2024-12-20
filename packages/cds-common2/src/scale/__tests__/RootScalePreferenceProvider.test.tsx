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
    function createWrapper() {
      const Wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
        <ScaleProvider value="xSmall">
          <RootScalePreferenceProvider value="xxLarge">{children}</RootScalePreferenceProvider>
        </ScaleProvider>
      );
      return Wrapper;
    }

    const { result } = renderHook(() => useRootScalePreference(), {
      wrapper: createWrapper(),
    });
    expect(result.current).toBe('xxLarge');
  });

  it('can have a different value from ScaleProvider', () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return (
        <RootScalePreferenceProvider value="xxLarge">
          <ScaleProvider value="xSmall">{children}</ScaleProvider>
        </RootScalePreferenceProvider>
      );
    }
    const { result } = renderHook(
      () => {
        return {
          scale: useScale(),
          rootScale: useRootScalePreference(),
        };
      },
      {
        wrapper: Wrapper,
      },
    );
    expect(result.current.rootScale).toBe('xxLarge');
    expect(result.current.scale).toBe('xSmall');
  });

  it('logs an error if trying to render multiple RootScalePreferenceProviders', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    function Wrapper({ children }: { children: React.ReactNode }) {
      return (
        <RootScalePreferenceProvider value="xxLarge">
          <RootScalePreferenceProvider value="xSmall">{children}</RootScalePreferenceProvider>
        </RootScalePreferenceProvider>
      );
    }

    renderHook(() => useRootScalePreference(), {
      wrapper: Wrapper,
    });
    expect(spy).toHaveBeenCalledWith(
      'Multiple RootScalePreferenceProviders were rendered and there should only be one. Ensure there is a single RootScalePreferenceProvider to resolve.',
    );
    spy.mockRestore();
  });
});
