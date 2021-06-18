/* eslint-disable react/display-name */
import { renderHook } from '@testing-library/react-hooks';

import { RootSpectrumProvider } from '../RootSpectrumProvider';
import { SpectrumProvider } from '../SpectrumProvider';
import { useRootSpectrum } from '../useRootSpectrum';
import { useSpectrum } from '../useSpectrum';

describe('RootSpectrumProvider', () => {
  it('defaults to large', () => {
    const { result } = renderHook(() => useRootSpectrum(), {
      wrapper: RootSpectrumProvider,
    });
    expect(result.current).toBe('light');
  });

  it('is not impacted by a parent SpectrumProvider', () => {
    const { result } = renderHook(() => useRootSpectrum(), {
      wrapper: ({ children }) => (
        <SpectrumProvider value="light">
          <RootSpectrumProvider value="dark">{children}</RootSpectrumProvider>
        </SpectrumProvider>
      ),
    });
    expect(result.current).toBe('dark');
  });

  it('will populate useSpectrum as long as scale is not overwritten', () => {
    const { result } = renderHook(() => useSpectrum(), {
      wrapper: ({ children }) => (
        <RootSpectrumProvider value="dark">{children}</RootSpectrumProvider>
      ),
    });
    expect(result.current).toBe('dark');
  });

  it('can have a different value from SpectrumProvider', () => {
    const { result } = renderHook(
      () => {
        return {
          scale: useSpectrum(),
          rootScale: useRootSpectrum(),
        };
      },
      {
        wrapper: ({ children }) => (
          <RootSpectrumProvider value="dark">
            <SpectrumProvider value="light">{children}</SpectrumProvider>
          </RootSpectrumProvider>
        ),
      }
    );
    expect(result.current.rootScale).toBe('dark');
    expect(result.current.scale).toBe('light');
  });

  it('logs an error if trying to render multiple RootSpectrumProviders', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    renderHook(() => useRootSpectrum(), {
      wrapper: ({ children }) => (
        <RootSpectrumProvider value="dark">
          <RootSpectrumProvider value="light">{children}</RootSpectrumProvider>
        </RootSpectrumProvider>
      ),
    });
    expect(spy).toHaveBeenCalledWith(
      'Multiple RootSpectrumProviders were rendered and there should only be one. Ensure there is a single RootSpectrumProvider to resolve.'
    );
    spy.mockRestore();
  });
});
