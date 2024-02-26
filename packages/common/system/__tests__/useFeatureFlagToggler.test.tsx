import { act, renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider, FeatureFlagProviderProps } from '../FeatureFlagProvider';
import { useFeatureFlags } from '../useFeatureFlags';
import { useFeatureFlagToggler } from '../useFeatureFlagToggler';

describe('useFeatureFlagToggler', () => {
  it('correctly handles toggling a feature flag', () => {
    function Wrapper(props: FeatureFlagProviderProps) {
      return <FeatureFlagProvider {...props} />;
    }
    const { result } = renderHook(
      () => {
        return {
          toggle: useFeatureFlagToggler(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: Wrapper,
      },
    );
    expect(result.current.featureFlags.flexGap).toBe(false);
    void act(() => {
      result.current.toggle('flexGap');
    });
    expect(result.current.featureFlags.flexGap).toBe(true);
  });
});
