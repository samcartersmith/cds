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

    expect(result.current.featureFlags.frontierTypography).toBe(false);
    void act(() => {
      result.current.dispatcher.dispatch({ type: 'update', value: { frontierTypography: true } });
    });
    expect(result.current.featureFlags.frontierTypography).toBe(true);
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

    expect(result.current.featureFlags.frontierTypography).toBe(false);
    void act(() => {
      result.current.dispatcher.dispatch({
        type: 'update',
        value: { frontierTypography: true, frontierCard: true },
      });
      result.current.dispatcher.dispatch({ type: 'update', value: { frontierButton: true } });
    });
    expect(result.current.featureFlags).toMatchObject({
      frontierTypography: true,
      frontierCard: true,
      frontierButton: true,
    });
  });

  it('correctly handles toggling frontier on and off', () => {
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

    void act(() => {
      result.current.dispatcher.dispatch({ type: 'toggle', name: 'frontier' });
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
      result.current.dispatcher.dispatch({ type: 'toggle', name: 'frontier' });
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
