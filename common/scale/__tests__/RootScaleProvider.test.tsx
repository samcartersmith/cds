import { renderHook } from '@testing-library/react-hooks';

import { RootScaleProvider } from '../RootScaleProvider';
import { ScaleProvider } from '../ScaleProvider';
import { useRootScale } from '../useRootScale';
import { useScale } from '../useScale';

describe('RootScaleProvider', () => {
  it('defaults to large', () => {
    const { result } = renderHook(() => useRootScale(), {
      wrapper: RootScaleProvider,
    });
    expect(result.current).toBe('large');
  });

  it('is not impacted by a parent ScaleProvider', () => {
    const { result } = renderHook(() => useRootScale(), {
      wrapper: ({ children }) => (
        <ScaleProvider value="xSmall">
          <RootScaleProvider value="xxLarge">{children}</RootScaleProvider>
        </ScaleProvider>
      ),
    });
    expect(result.current).toBe('xxLarge');
  });

  it('will populate useScale as long as scale is not overwritten', () => {
    const { result } = renderHook(() => useScale(), {
      wrapper: ({ children }) => <RootScaleProvider value="xxLarge">{children}</RootScaleProvider>,
    });
    expect(result.current).toBe('xxLarge');
  });

  it('can have a different value from ScaleProvider', () => {
    const { result } = renderHook(
      () => {
        return {
          scale: useScale(),
          rootScale: useRootScale(),
        };
      },
      {
        wrapper: ({ children }) => (
          <RootScaleProvider value="xxLarge">
            <ScaleProvider value="xSmall">{children}</ScaleProvider>
          </RootScaleProvider>
        ),
      },
    );
    expect(result.current.rootScale).toBe('xxLarge');
    expect(result.current.scale).toBe('xSmall');
  });

  it('logs an error if trying to render multiple RootScaleProviders', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    renderHook(() => useRootScale(), {
      wrapper: ({ children }) => (
        <RootScaleProvider value="xxLarge">
          <RootScaleProvider value="xSmall">{children}</RootScaleProvider>
        </RootScaleProvider>
      ),
    });
    expect(spy).toHaveBeenCalledWith(
      'Multiple RootScaleProviders were rendered and there should only be one. Ensure there is a single RootScaleProvider to resolve.',
    );
    spy.mockRestore();
  });
});
