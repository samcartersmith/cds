import { RefObject, useEffect } from 'react';
import { TabIndicatorProps } from '@cbhq/cds-common';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common/animation/tabs';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';

import { Animated } from '../../animation/Animated';

type UseAnimateTabIndicator = {
  widthRef: RefObject<HTMLElement>;
  xRef: RefObject<HTMLElement>;
} & Pick<TabIndicatorProps, 'width' | 'x'>;

// We don't want to animate on the initial mount, so we'll set the initial value to something impossible
const INITIAL_VALUE = -1;

export const useAnimateTabIndicator = ({ widthRef, width, xRef, x }: UseAnimateTabIndicator) => {
  const { getPreviousValue: getPreviousWidth, addPreviousValue: addPreviousWidth } =
    usePreviousValues<number>([INITIAL_VALUE]);
  const { getPreviousValue: getPreviousX, addPreviousValue: addPreviousX } =
    usePreviousValues<number>([]);

  const skipAnimation = getPreviousWidth() === INITIAL_VALUE;

  addPreviousWidth(width);
  addPreviousX(x);

  useEffect(() => {
    void Animated.parallel([
      Animated.timing(widthRef, {
        property: 'transform',
        fromValue: `translateX(${skipAnimation ? width : getPreviousWidth()}px)`,
        toValue: `translateX(${width}px)`,
        ...animateTabIndicatorBaseSpec,
      }),
      Animated.timing(xRef, {
        property: 'transform',
        fromValue: `translateX(${skipAnimation ? x : getPreviousX()}px)`,
        toValue: `translateX(${x}px)`,
        ...animateTabIndicatorBaseSpec,
      }),
    ])?.start();
  }, [getPreviousX, getPreviousWidth, xRef, widthRef, width, x, skipAnimation]);
};
