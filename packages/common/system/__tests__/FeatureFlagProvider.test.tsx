import { emptyObject } from '@cbhq/cds-utils';
import { renderHook, act } from '@testing-library/react-hooks';
import { defaultFeatureFlags } from '../FeatureFlagContext';

import { FeatureFlagProvider, getFrontierFlags } from '../FeatureFlagProvider';
import { useFeatureFlags } from '../useFeatureFlags';
import { useFeatureFlagUpdater } from '../useFeatureFlagUpdater';

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
      frontier: true,
      frontierButton: true,
      frontierCard: true,
      frontierColor: true,
      frontierSparkline: true,
      frontierTypography: true,
    });
  });

  it('handles frontier: true and individual frontier overrides properly', () => {
    const features = { frontier: true, frontierButton: false };
    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: (props) => <FeatureFlagProvider {...features} {...props} />,
    });
    expect(result.current).toEqual({
      frontier: true,
      frontierCard: true,
      frontierColor: true,
      frontierSparkline: true,
      frontierTypography: true,
      frontierButton: false,
    });
  });

  it('handles prop changes', () => {
    const { result, rerender } = renderHook(() => useFeatureFlags(), {
      wrapper: (props) => <FeatureFlagProvider {...props} />,
      initialProps: { frontierCard: true, frontierButton: true },
    });

    expect(result.current).toMatchObject({ frontierCard: true, frontierButton: true });
    rerender({ frontierCard: false, frontierButton: false });
    expect(result.current).toMatchObject({
      frontierCard: false,
      frontierButton: false,
    });
  });

  it('imperative updates + props can work together', async () => {
    const { result } = renderHook(
      () => {
        return {
          update: useFeatureFlagUpdater(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
        initialProps: {
          frontierButton: true,
        },
      },
    );

    expect(result.current.featureFlags).toMatchObject({
      frontierTypography: false,
      frontierButton: true,
    });
    await act(() => {
      result.current.update({ frontierTypography: true });
    });
    expect(result.current.featureFlags).toMatchObject({
      frontierTypography: true,
      frontierButton: true, // no change
    });
  });

  it('imperative updates take precendence to props if they conflict', async () => {
    const { result } = renderHook(
      () => {
        return {
          update: useFeatureFlagUpdater(),
          featureFlags: useFeatureFlags(),
        };
      },
      {
        wrapper: (props) => <FeatureFlagProvider {...props} />,
        initialProps: {
          frontierButton: true,
        },
      },
    );

    expect(result.current.featureFlags.frontierButton).toBe(true);
    await act(() => {
      result.current.update({ frontierButton: false });
    });
    expect(result.current.featureFlags.frontierButton).toBe(false); // imperative update wins
  });

  it('getFrontierFlags works correctly for undefined', () => {
    const result = getFrontierFlags(undefined);
    expect(result).toEqual(emptyObject);
  });

  it('getFrontierFlags works correctly for true', () => {
    const result = getFrontierFlags(true);
    expect(result).toEqual({
      frontier: true,
      frontierButton: true,
      frontierCard: true,
      frontierColor: true,
      frontierSparkline: true,
      frontierTypography: true,
    });
  });

  it('getFrontierFlags works correctly for false', () => {
    const result = getFrontierFlags(false);
    expect(result).toEqual(emptyObject);
  });
});
