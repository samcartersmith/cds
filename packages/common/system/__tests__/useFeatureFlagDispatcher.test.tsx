import { act, renderHook } from '@testing-library/react-hooks';

import { FeatureFlagProvider, FeatureFlagProviderProps } from '../FeatureFlagProvider';
import { useFeatureFlagDispatcher } from '../useFeatureFlagDispatcher';
import { useFeatureFlags } from '../useFeatureFlags';

describe('useFeatureFlagDispatcher', () => {
  it('updates features flags when called', () => {
    function Wrapper(props: FeatureFlagProviderProps) {
      return <FeatureFlagProvider {...props} />;
    }

    const { result } = renderHook(
      () => {
        return {
          dispatcher: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.featureFlags.flexGap).toBe(false);
    void act(() => {
      result.current.dispatcher.dispatch({ type: 'update', value: { flexGap: true } });
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
          dispatcher: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.featureFlags.flexGap).toBe(false);
    void act(() => {
      result.current.dispatcher.dispatch({
        type: 'update',
        value: { flexGap: true },
      });
      result.current.dispatcher.dispatch({ type: 'update', value: { fabric: true } });
    });
    expect(result.current.featureFlags).toMatchObject({
      flexGap: true,
      fabric: true,
    });
  });
});
