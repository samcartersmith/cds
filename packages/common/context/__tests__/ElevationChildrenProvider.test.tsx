import { renderHook } from '@testing-library/react-hooks';

import { defaultPalette } from '../../palette/constants';
import { usePaletteConfig } from '../../palette/usePaletteConfig';
import { SystemProvider } from '../../SystemProvider';
import { ElevationChildrenProvider, ElevationProvider } from '../ElevationProvider';

describe('ElevationChildrenProvider', () => {
  /** Light mode */
  it('does not override palette variables if spectrum is light and parent has elevation of 1', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: (props) => (
        <SystemProvider>
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current.secondary).toEqual(defaultPalette.secondary);
    expect(result.current.line).toEqual(defaultPalette.line);
  });

  it('does not override palette variables if spectrum is light and parent has elevation of 2', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: (props) => (
        <SystemProvider>
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current.secondary).toEqual(defaultPalette.secondary);
    expect(result.current.line).toEqual(defaultPalette.line);
  });

  /** Dark mode */
  it('does not override palette variables if spectrum is dark and no elevation is set', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current.secondary).toEqual(defaultPalette.secondary);
    expect(result.current.line).toEqual(defaultPalette.line);
  });

  it('overrides palette variables if spectrum is dark and parent has elevation of 1', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current.background).not.toEqual(defaultPalette.background);
    expect(result.current.background).toBe('gray5');
    // secondary should match background
    expect(result.current.secondary).toEqual(['gray5', 1]);
    // should not override line unless level 2
    expect(result.current.line).toEqual(defaultPalette.line);
  });

  it('overrides palette variables if spectrum is dark and parent has elevation of 2', () => {
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current.background).not.toEqual(defaultPalette.background);
    expect(result.current.background).toBe('gray10');
    // secondary should match background
    expect(result.current.secondary).toEqual(['gray10', 1]);
    // line should be brighter
    expect(result.current.line).toEqual(defaultPalette.lineHeavy);
  });
});
