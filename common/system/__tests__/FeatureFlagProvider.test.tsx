import { renderHook } from '@testing-library/react-hooks';

import { frontierFeaturesOn, defaultFeatureFlags } from '../FeatureFlagContext';
import { FeatureFlagProvider } from '../FeatureFlagProvider';
import { useFeatureFlags } from '../useFeatureFlags';

describe('FeatureFlagProvider', () => {
  it('sets defaultFeatureFlags iF no props are provided', () => {
    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: (props) => <FeatureFlagProvider {...props} />,
    });
    expect(result.current).toEqual(defaultFeatureFlags);
  });

  it('toggles all frontier features true if frontier: true', () => {
    const features = { frontier: true };
    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: (props) => <FeatureFlagProvider {...features} {...props} />,
    });
    expect(result.current).toEqual({
      fontMigration: false,
      frontier: true,
      ...frontierFeaturesOn,
    });
  });

  it('handles frontier: true and individual frontier overrides properly', () => {
    const features = { frontier: true, frontierButton: false };
    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: (props) => <FeatureFlagProvider {...features} {...props} />,
    });
    expect(result.current).toEqual({
      fontMigration: false,
      frontier: true,
      ...frontierFeaturesOn,
      frontierButton: false,
    });
  });
});
