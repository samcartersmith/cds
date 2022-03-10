import { renderHook, act } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../FeatureFlagProvider';
import { useFeatureFlagToggler } from '../useFeatureFlagToggler';
import { useFeatureFlags } from '../useFeatureFlags';

describe('useFeatureFlagToggler', () => {
  it('correctly handles toggling a feature flag', () => {
    const { result } = renderHook(
      () => {
        return {
          toggle: useFeatureFlagToggler(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );
    expect(result.current.featureFlags.frontierTypography).toEqual(false);
    void act(() => {
      result.current.toggle('frontierTypography');
    });
    expect(result.current.featureFlags.frontierTypography).toEqual(true);
  });
});
