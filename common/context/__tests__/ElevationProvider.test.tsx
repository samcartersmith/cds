/* eslint-disable react/display-name */
import { renderHook } from '@testing-library/react-hooks';

import { defaultPalette } from '../../palette/constants';
import { usePaletteConfig } from '../../palette/usePaletteConfig';
import { SystemProvider } from '../../SystemProvider';
import { ElevationProvider } from '../ElevationProvider';

describe('ElevationProvider', () => {
  it('does not override palette variables if spectrum is light', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: props => (
        <SystemProvider>
          <ElevationProvider {...props} />
        </SystemProvider>
      ),
    });
    expect(result.current.background).toBe(defaultPalette.background);
  });

  it('does not override palette variables if spectrum is dark and no elevation is set', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: props => (
        <SystemProvider spectrum="dark">
          <ElevationProvider {...props} />
        </SystemProvider>
      ),
    });
    expect(result.current.background).toBe(defaultPalette.background);
  });

  it('overrides palette variables if spectrum is dark and elevation of 1 is set', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: props => (
        <SystemProvider spectrum="dark">
          <ElevationProvider {...props} elevation={1} />
        </SystemProvider>
      ),
    });
    expect(result.current.background).toBe('gray5');
  });

  it('overrides palette variables if spectrum is dark and elevation of 2 is set', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: props => (
        <SystemProvider spectrum="dark">
          <ElevationProvider {...props} elevation={2} />
        </SystemProvider>
      ),
    });
    expect(result.current.background).toBe('gray15');
  });
});
