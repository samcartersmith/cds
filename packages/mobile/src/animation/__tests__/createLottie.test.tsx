import { useMemo } from 'react';
import { Animated } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import uniqBy from 'lodash/uniqBy';
import { nux, NuxLottie } from '@cbhq/cds-lottie-files/nux';

import { createLottie, LottiePlayerMobile } from '../createLottie';

const animations = [nux, nux, nux];

function getAnimatedValue(val: Animated.Value) {
  // @ts-expect-error: I know what I'm doing.
  // eslint-disable-next-line no-underscore-dangle
  return val._value as unknown;
}

describe('useLottieCreator', () => {
  let result: LottiePlayerMobile<NuxLottie>[] = [];

  beforeEach(() => {
    result = renderHook(() => {
      return useMemo(() => {
        return animations.map((tutorial) => createLottie(tutorial));
      }, []);
    }).result.current;
  });

  it('ensures each progress value is unique', () => {
    expect(uniqBy(result, 'progress')).toHaveLength(animations.length);
  });

  it('ensures each Lottie component is unique', () => {
    expect(uniqBy(result, 'Lottie')).toHaveLength(animations.length);
  });

  it('ensures progress value updates are registered correctly', () => {
    const [firstItem, secondItem, thirdItem] = result;
    firstItem.progress.value.setValue(1);
    expect(getAnimatedValue(firstItem.progress.value)).toBe(1);
    expect(getAnimatedValue(secondItem.progress.value)).toBe(0);
    expect(getAnimatedValue(thirdItem.progress.value)).toBe(0);
    expect(firstItem.progress).not.toBe(secondItem.progress);
  });
});
