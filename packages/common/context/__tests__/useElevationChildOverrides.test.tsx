import { renderHook } from '@testing-library/react-hooks';

import { SystemProvider } from '../../SystemProvider';
import {
  ElevationChildrenProvider,
  ElevationProvider,
  useElevationChildOverrides,
} from '../ElevationProvider';

describe('useElevationChildOverrides', () => {
  it('returns false if child is not nested within an ElevationProvider', () => {
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: (props) => (
        <SystemProvider>
          <ElevationChildrenProvider {...props} />
        </SystemProvider>
      ),
    });
    expect(result.current).toBe(false);
  });

  it('returns false if child is nested within an ElevationProvider but no elevation is set', () => {
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: (props) => (
        <SystemProvider>
          <ElevationProvider>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toBe(false);
  });

  it('light mode - returns false if child is nested within an ElevationProvider and parent has an elevation of 1', () => {
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: (props) => (
        <SystemProvider spectrum="light">
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toBe(false);
  });

  it('light mode - returns false if child is nested within an ElevationProvider and parent has an elevation of 2', () => {
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: (props) => (
        <SystemProvider spectrum="light">
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toBe(false);
  });

  it('dark mode - returns true if child is nested within an ElevationProvider and parent has an elevation of 1', () => {
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={1}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toBe(true);
  });

  it('dark mode - returns true if child is nested within an ElevationProvider and parent has an elevation of 2', () => {
    const { result } = renderHook(() => useElevationChildOverrides(), {
      wrapper: (props) => (
        <SystemProvider spectrum="dark">
          <ElevationProvider elevation={2}>
            <ElevationChildrenProvider {...props} />
          </ElevationProvider>
        </SystemProvider>
      ),
    });
    expect(result.current).toBe(true);
  });
});
