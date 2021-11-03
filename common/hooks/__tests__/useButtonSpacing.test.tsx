import { renderHook } from '@testing-library/react-hooks';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';

import { useButtonSpacing, UseButtonSpacingParams } from '../useButtonSpacing';

describe('useButtonSpacing', () => {
  it('returns correct size if compact: false and frontier: false', () => {
    const { result } = renderHook(() => {
      return useButtonSpacing({ compact: false });
    });

    expect(result.current).toEqual({ horizontal: 3, vertical: 2 });
  });

  it('returns correct size if compact: true and frontier: false', () => {
    const { result } = renderHook(() => {
      return useButtonSpacing({ compact: true });
    });

    expect(result.current).toEqual({ horizontal: 2, vertical: 1 });
  });

  // Frontier tests
  function createFrontierHook(params: UseButtonSpacingParams) {
    return renderHook(
      () => {
        return useButtonSpacing(params);
      },
      {
        wrapper: FeatureFlagProvider,
        initialProps: {
          frontierButton: true,
        },
      },
    ).result.current;
  }

  it('there is no change for compact: true or compact:false for frontier', () => {
    const compactValue = createFrontierHook({ compact: true });
    expect(compactValue).toEqual({ start: 4, end: 4 });
    const defaultValue = createFrontierHook({ compact: false });
    expect(defaultValue).toEqual({ start: 4, end: 4 });
  });

  it('decreases spacing if startIcon and/or endIcon is present', () => {
    const withStartIcon = createFrontierHook({ startIcon: 'shield' });
    expect(withStartIcon).toEqual({ start: 3, end: 4 });
    const withEndIcon = createFrontierHook({ endIcon: 'shield' });
    expect(withEndIcon).toEqual({ start: 4, end: 3 });
    const withStartAndEndIcon = createFrontierHook({
      startIcon: 'smartContract',
      endIcon: 'shield',
    });
    expect(withStartAndEndIcon).toEqual({ start: 3, end: 3 });
  });
});
