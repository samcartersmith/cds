import { renderHook, act } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../FeatureFlagProvider';
import { useFeatureFlagDispatcher } from '../useFeatureFlagDispatcher';
import { useFeatureFlags } from '../useFeatureFlags';

describe('useFeatureFlagDispatcher', () => {
  it('updates features flags when called', () => {
    const { result } = renderHook(
      () => {
        return {
          dispatcher: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    expect(result.current.featureFlags.frontierTypography).toEqual(false);
    void act(() => {
      result.current.dispatcher.dispatch({ type: 'update', value: { frontierTypography: true } });
    });
    expect(result.current.featureFlags.frontierTypography).toEqual(true);
  });

  it('merges updates', () => {
    const { result } = renderHook(
      () => {
        return {
          dispatcher: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    expect(result.current.featureFlags.frontierTypography).toEqual(false);
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
    const { result } = renderHook(
      () => {
        return {
          dispatcher: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
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
