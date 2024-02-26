import { renderHook } from '@testing-library/react-hooks';

import { defaultPalette, elevation1Palette, elevation2Palette } from '../../palette/constants';
import { usePaletteConfig } from '../../palette/usePaletteConfig';
import { SystemProvider } from '../../SystemProvider';
import { ElevationProvider, ElevationProviderProps } from '../ElevationProvider';

describe('ElevationProvider', () => {
  it('does not override palette variables if spectrum is light', () => {
    function Wrapper(props: ElevationProviderProps) {
      return (
        <SystemProvider>
          <ElevationProvider {...props} />
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.background).toEqual(defaultPalette.background);
  });

  it('does not override palette variables if spectrum is dark and no elevation is set', () => {
    function Wrapper(props: ElevationProviderProps) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider {...props} />
        </SystemProvider>
      );
    }
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.background).toEqual(defaultPalette.background);
  });

  it('overrides palette variables if spectrum is dark and elevation of 1 is set', () => {
    function Wrapper(props: ElevationProviderProps) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider {...props} elevation={1} />
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.background).not.toEqual(defaultPalette.background);
    expect(result.current.background).toBe(elevation1Palette.dark.background);
  });

  it('overrides palette variables if spectrum is dark and elevation of 2 is set', () => {
    function Wrapper(props: ElevationProviderProps) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider {...props} elevation={2} />
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.background).not.toEqual(defaultPalette.background);
    expect(result.current.background).toEqual(elevation2Palette.dark.background);
  });
});
