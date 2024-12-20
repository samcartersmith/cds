import { renderHook } from '@testing-library/react-hooks';

import {
  darkDefaultPalette,
  defaultPalette,
  elevation2ChildrenPalette,
} from '../../palette/constants';
import { usePaletteConfig } from '../../palette/usePaletteConfig';
import { SystemProvider } from '../../SystemProvider';
import { ElevationChildrenProvider, ElevationProvider } from '../ElevationProvider';

describe('ElevationChildrenProvider', () => {
  /** Light mode */
  it('does not override palette variables if spectrum is light and parent has elevation of 1', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider>
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.secondary).toEqual(defaultPalette.secondary);
    expect(result.current.line).toEqual(defaultPalette.line);
  });

  it('does not override palette variables if spectrum is light and parent has elevation of 2', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider>
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.secondary).toEqual(defaultPalette.secondary);
    expect(result.current.line).toEqual(defaultPalette.line);
  });

  /** Dark mode */
  it('does not override palette variables if spectrum is dark and no elevation is set', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.secondary).toEqual(darkDefaultPalette.secondary);
    expect(result.current.line).toEqual(darkDefaultPalette.line);
  });

  it('overrides palette variables if spectrum is dark and parent has elevation of 1', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.background).not.toEqual(darkDefaultPalette.background);
    expect(result.current.background).toBe('gray5');
    expect(result.current.secondary).toStrictEqual(darkDefaultPalette.secondary);
    // should not override line unless level 2
    expect(result.current.line).toEqual(darkDefaultPalette.line);
  });

  it('overrides palette variables if spectrum is dark and parent has elevation of 2', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }
    const { result } = renderHook(() => usePaletteConfig(), {
      wrapper: Wrapper,
    });
    expect(result.current.background).not.toEqual(darkDefaultPalette.background);
    expect(result.current.secondary).toStrictEqual(darkDefaultPalette.secondary);
    // line should be brighter
    expect(result.current.line).toStrictEqual(elevation2ChildrenPalette.dark.line);
  });
});
