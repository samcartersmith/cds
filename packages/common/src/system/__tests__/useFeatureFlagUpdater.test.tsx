import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider, FeatureFlagProviderProps } from '../FeatureFlagProvider';
import { useFeatureFlags } from '../useFeatureFlags';
import { useFeatureFlagUpdater } from '../useFeatureFlagUpdater';

describe('useFeatureFlagUpdater', () => {
  it('updates features flags when called', () => {
    function Wrapper(props: FeatureFlagProviderProps) {
      return <FeatureFlagProvider {...props} />;
    }
    const { result } = renderHook(
      () => {
        return {
          update: useFeatureFlagUpdater(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.featureFlags.flexGap).toBe(false);
    void act(() => {
      result.current.update({ flexGap: true });
    });
    expect(result.current.featureFlags.flexGap).toBe(true);
  });

  it('merges updates', () => {
    function Wrapper(props: FeatureFlagProviderProps) {
      return <FeatureFlagProvider {...props} />;
    }
    const { result } = renderHook(
      () => {
        return {
          update: useFeatureFlagUpdater(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.featureFlags.flexGap).toBe(false);
    void act(() => {
      result.current.update({ flexGap: true });
      result.current.update({ fabric: true });
    });
    expect(result.current.featureFlags).toMatchObject({
      flexGap: true,
      fabric: true,
    });
  });
});
