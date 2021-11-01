import { renderHook, act } from '@testing-library/react-hooks';

import { FeatureFlagProvider } from '../FeatureFlagProvider';
import { useFeatureFlagDispatcher } from '../useFeatureFlagDispatcher';
import { useFeatureFlags } from '../useFeatureFlags';
import { frontierFeaturesOn, frontierFeaturesOff } from '../FeatureFlagContext';

describe('useFeatureFlagDispatcher', () => {
  it('updates features flags when called', () => {
    const { result } = renderHook(
      () => {
        return {
          dispatch: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    expect(result.current.featureFlags.frontierTypography).toEqual(false);
    void act(() => {
      result.current.dispatch({ type: 'update', value: { frontierTypography: true } });
    });
    expect(result.current.featureFlags.frontierTypography).toEqual(true);
  });

  it('merges updates', () => {
    const { result } = renderHook(
      () => {
        return {
          dispatch: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    expect(result.current.featureFlags.frontierTypography).toEqual(false);
    void act(() => {
      result.current.dispatch({
        type: 'update',
        value: { frontierTypography: true, frontierCard: true },
      });
      result.current.dispatch({ type: 'update', value: { frontierButton: true } });
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
          dispatch: useFeatureFlagDispatcher(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
      },
    );

    void act(() => {
      result.current.dispatch({ type: 'toggle', name: 'frontier' });
    });
    expect(result.current.featureFlags).toMatchObject(frontierFeaturesOn);
    void act(() => {
      result.current.dispatch({ type: 'toggle', name: 'frontier' });
    });
    expect(result.current.featureFlags).toMatchObject(frontierFeaturesOff);
  });
});
