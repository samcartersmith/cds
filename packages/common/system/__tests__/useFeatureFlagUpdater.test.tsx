import { act, renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../FeatureFlagProvider';
import { useFeatureFlags } from '../useFeatureFlags';
import { useFeatureFlagUpdater } from '../useFeatureFlagUpdater';

describe('useFeatureFlagUpdater', () => {
  it('updates features flags when called', () => {
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

    expect(result.current.featureFlags.frontierTypography).toBe(false);
    void act(() => {
      result.current.update({ frontierTypography: true });
    });
    expect(result.current.featureFlags.frontierTypography).toBe(true);
  });

  it('merges updates', () => {
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

    expect(result.current.featureFlags.frontierTypography).toBe(false);
    void act(() => {
      result.current.update({ frontierTypography: true, frontierCard: true });
      result.current.update({ frontierButton: true });
    });
    expect(result.current.featureFlags).toMatchObject({
      frontierTypography: true,
      frontierCard: true,
      frontierButton: true,
    });
  });

  it('correctly handles toggling frontier on and off', () => {
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

    void act(() => {
      result.current.update({ frontier: true });
    });
    expect(result.current.featureFlags).toMatchObject({
      frontier: true,
      frontierButton: true,
      frontierCard: true,
      frontierColor: true,
      frontierSparkline: true,
      frontierTypography: true,
    });
    void act(() => {
      result.current.update({ frontier: false });
    });
    expect(result.current.featureFlags).toMatchObject({
      frontier: false,
      frontierButton: false,
      frontierCard: false,
      frontierColor: false,
      frontierSparkline: false,
      frontierTypography: false,
    });
  });
});
