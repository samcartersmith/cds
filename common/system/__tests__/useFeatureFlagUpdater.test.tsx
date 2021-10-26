import { renderHook, act } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../FeatureFlagProvider';
import { useFeatureFlagUpdater } from '../useFeatureFlagUpdater';
import { useFeatureFlags } from '../useFeatureFlags';
import { frontierFeaturesOn, frontierFeaturesOff } from '../FeatureFlagContext';

describe('useFeatureFlagUpdater', () => {
  it('updates features flags when called', async () => {
    const { result } = renderHook(
      () => {
        return {
          update: useFeatureFlagUpdater(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    expect(result.current.featureFlags.frontierTypography).toEqual(false);
    await act(() => {
      result.current.update({ frontierTypography: true });
    });
    expect(result.current.featureFlags.frontierTypography).toEqual(true);
  });

  it('merges updates', async () => {
    const { result } = renderHook(
      () => {
        return {
          update: useFeatureFlagUpdater(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    expect(result.current.featureFlags.frontierTypography).toEqual(false);
    await act(() => {
      result.current.update({ frontierTypography: true, frontierCard: true });
      result.current.update({ frontierButton: true });
    });
    expect(result.current.featureFlags).toMatchObject({
      frontierTypography: true,
      frontierCard: true,
      frontierButton: true,
    });
  });

  it('correctly handles toggling frontier on and off', async () => {
    const { result } = renderHook(
      () => {
        return {
          update: useFeatureFlagUpdater(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    await act(() => {
      result.current.update({ frontier: true });
    });
    expect(result.current.featureFlags).toMatchObject(frontierFeaturesOn);
    await act(() => {
      result.current.update({ frontier: false });
    });
    expect(result.current.featureFlags).toMatchObject(frontierFeaturesOff);
  });
});
