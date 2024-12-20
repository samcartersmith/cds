import { renderHook } from '@testing-library/react-hooks';

import { defaultFeatureFlags } from '../FeatureFlagContext';
import { FeatureFlagProvider, FeatureFlagProviderProps } from '../FeatureFlagProvider';
import { useFeatureFlags } from '../useFeatureFlags';
import { useFeatureFlagUpdater } from '../useFeatureFlagUpdater';

describe('FeatureFlagProvider', () => {
  it('sets defaultFeatureFlags iF no props are provided', () => {
    function Wrapper(props: FeatureFlagProviderProps) {
      return <FeatureFlagProvider {...props} />;
    }

    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: Wrapper,
    });
    expect(result.current).toEqual(defaultFeatureFlags);
  });

  it('handles prop changes', () => {
    const { result, rerender } = renderHook(() => useFeatureFlags(), {
      wrapper: (props) => <FeatureFlagProvider {...props} />,
      initialProps: { flexGap: true },
    });

    expect(result.current).toMatchObject({ flexGap: true });
    rerender({ flexGap: false });
    expect(result.current).toMatchObject({
      flexGap: false,
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
          flexGap: true,
        },
      },
    );

    expect(result.current.featureFlags).toMatchObject({
      fabric: false,
      flexGap: true,
    });
    result.current.update({ fabric: true });
    expect(result.current.featureFlags).toMatchObject({
      fabric: true,
      flexGap: true, // no change
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
          flexGap: true,
        },
      },
    );

    expect(result.current.featureFlags.flexGap).toBe(true);
    result.current.update({ flexGap: false });
    expect(result.current.featureFlags.flexGap).toBe(false); // imperative update wins
  });
});
