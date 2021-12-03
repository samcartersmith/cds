import { renderHook } from '@testing-library/react-hooks';

import { useDotPlacementStyles, OFFSET } from '../useDotPlacementStyles';

describe('useDotPlacementStyles Web', () => {
  it('returns empty object when placement is undefined', () => {
    const { result } = renderHook(() => useDotPlacementStyles('web'));

    expect(result.current).toEqual({});
  });

  it('returns the correct positioning when placement = bottom-start', () => {
    const { result } = renderHook(() => useDotPlacementStyles('web', 'bottom-start'));

    expect(result.current).toEqual({
      position: 'absolute',
      bottom: OFFSET,
      left: OFFSET,
    });
  });

  it('returns the correct positioning when placement = top-start', () => {
    const { result } = renderHook(() => useDotPlacementStyles('web', 'top-start'));

    expect(result.current).toEqual({
      position: 'absolute',
      top: OFFSET,
      left: OFFSET,
    });
  });

  it('returns the correct positioning when placement = bottom-end', () => {
    const { result } = renderHook(() => useDotPlacementStyles('web', 'bottom-end'));

    expect(result.current).toEqual({
      position: 'absolute',
      bottom: OFFSET,
      right: OFFSET,
    });
  });

  it('returns the correct positioning given that placement = top-end', () => {
    const { result } = renderHook(() => useDotPlacementStyles('web', 'top-end'));

    expect(result.current).toEqual({
      position: 'absolute',
      top: OFFSET,
      right: OFFSET,
    });
  });
});

describe('useDotPlacementStyles Mobile', () => {
  it('returns emptyObject when placement is undefined', () => {
    const { result } = renderHook(() => useDotPlacementStyles('mobile'));

    expect(result.current).toEqual({});
  });

  it('returns the correct positioning when placement = bottom-start', () => {
    const { result } = renderHook(() => useDotPlacementStyles('mobile', 'bottom-start'));

    expect(result.current).toEqual({
      position: 'absolute',
      bottom: OFFSET,
      start: OFFSET,
    });
  });

  it('returns the correct positioning when placement = top-start', () => {
    const { result } = renderHook(() => useDotPlacementStyles('mobile', 'top-start'));

    expect(result.current).toEqual({
      position: 'absolute',
      top: OFFSET,
      start: OFFSET,
    });
  });

  it('returns the correct positioning when placement = bottom-end', () => {
    const { result } = renderHook(() => useDotPlacementStyles('mobile', 'bottom-end'));

    expect(result.current).toEqual({
      position: 'absolute',
      bottom: OFFSET,
      end: OFFSET,
    });
  });

  it('returns the correct positioning given that placement = top-end', () => {
    const { result } = renderHook(() => useDotPlacementStyles('mobile', 'top-end'));

    expect(result.current).toEqual({
      position: 'absolute',
      top: OFFSET,
      end: OFFSET,
    });
  });
});
