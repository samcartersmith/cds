import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../FeatureFlagProvider';
import { useFeatureFlag } from '../useFeatureFlag';

describe('useFeatureFlag', () => {
  it('returns a boolean for the given feature flag', () => {
    const { result } = renderHook(() => useFeatureFlag('fontMigration'), {
      wrapper: (props) => <FeatureFlagProvider {...props} />,
    });
    expect(result.current).toEqual(false);
  });

  it('returns true if feature flag was provided', () => {
    const { result } = renderHook(() => useFeatureFlag('fontMigration'), {
      wrapper: (props) => <FeatureFlagProvider fontMigration {...props} />,
    });
    expect(result.current).toEqual(true);
  });
});
