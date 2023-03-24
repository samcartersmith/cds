import { renderHook } from '@testing-library/react-hooks';

import { SystemProvider } from '../../SystemProvider';
import {
  ElevationChildrenProvider,
  ElevationProvider,
  useElevationChildOverrides,
} from '../ElevationProvider';

describe('useElevationChildOverrides', () => {
  it('returns false if child is not nested within an ElevationProvider', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider>
          <ElevationChildrenProvider {...props} />
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(false);
  });

  it('returns false if child is nested within an ElevationProvider but no elevation is set', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider>
          <ElevationProvider>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(false);
  });

  it('light mode - returns false if child is nested within an ElevationProvider and parent has an elevation of 1', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider spectrum="light">
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }

    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(false);
  });

  it('light mode - returns false if child is nested within an ElevationProvider and parent has an elevation of 2', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider spectrum="light">
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(false);
  });

  it('dark mode - returns true if child is nested within an ElevationProvider and parent has an elevation of 1', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(true);
  });

  it('dark mode - returns true if child is nested within an ElevationProvider and parent has an elevation of 2', () => {
    function Wrapper(props: React.PropsWithChildren<unknown>) {
      return (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      );
    }
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(true);
  });
});
