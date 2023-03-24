import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider, FeatureFlagProviderProps } from '../FeatureFlagProvider';
import { useFeatureFlag } from '../useFeatureFlag';

describe('useFeatureFlag', () => {
  it('returns a boolean for the given feature flag', () => {
    function Wrapper(props: FeatureFlagProviderProps) {
      return <FeatureFlagProvider {...props} />;
    }

    const { result } = renderHook(() => useFeatureFlag('frontierTypography'), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(false);
  });

  it('returns true if feature flag was provided', () => {
    function Wrapper(props: FeatureFlagProviderProps) {
      return <FeatureFlagProvider frontierTypography {...props} />;
    }

    const { result } = renderHook(() => useFeatureFlag('frontierTypography'), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(true);
  });
});
