import { useMemo } from 'react';

import { nux, NuxLottie } from '@cbhq/cds-lottie-files/nux';
import { renderHook } from '@testing-library/react-hooks';
import uniqBy from 'lodash/uniqBy';
import { Animated } from 'react-native';

import { createLottie, LottiePlayerMobile } from '../createLottie';

const animations = [nux, nux, nux];

function getAnimatedValue(val: Animated.Value) {
  // @ts-expect-error: I know what I'm doing.
  return val._value;
}

describe('useLottieCreator', () => {
  let result: LottiePlayerMobile<NuxLottie>[] = [];

  beforeEach(() => {
    result = renderHook(() => {
      return useMemo(() => {
        return animations.map(tutorial => createLottie(tutorial));
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
    expect(getAnimatedValue(firstItem.progress.value)).toEqual(1);
    expect(getAnimatedValue(secondItem.progress.value)).toEqual(0);
    expect(getAnimatedValue(thirdItem.progress.value)).toEqual(0);
    expect(firstItem.progress).not.toBe(secondItem.progress);
  });
});
