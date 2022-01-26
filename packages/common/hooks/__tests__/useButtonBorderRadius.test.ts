import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { useButtonBorderRadius } from '../useButtonBorderRadius';
import { useInteractableHeight } from '../useInteractableHeight';

describe('useButtonBorderRadius', () => {
  it('returns correct borderRadius for frontier: false & compact: false', () => {
    const { result } = renderHook(() => useButtonBorderRadius(false));
    expect(result.current).toBe('standard');
  });

  it('returns correct borderRadius for frontier: false & compact: true', () => {
    const { result } = renderHook(() => useButtonBorderRadius(true));
    expect(result.current).toBe('compact');
  });

  it('returns correct borderRadius for frontier: true & compact: false', () => {
    const { result } = renderHook(
      () => {
        return {
          height: useInteractableHeight(false),
          borderRadius: useButtonBorderRadius(false),
        };
      },
      {
        wrapper: FeatureFlagProvider,
        initialProps: {
          frontierButton: true,
        },
      },
    );
    expect(result.current.borderRadius).toEqual(result.current.height);
  });

  it('returns correct borderRadius for frontier: true & compact: true', () => {
    const { result } = renderHook(
      () => {
        return {
          height: useInteractableHeight(true),
          borderRadius: useButtonBorderRadius(true),
        };
      },
      {
        wrapper: FeatureFlagProvider,
        initialProps: {
          frontierButton: true,
        },
      },
    );
    expect(result.current.borderRadius).toEqual(result.current.height);
  });
});
