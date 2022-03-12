import { RefObject, useEffect } from 'react';
import { TabIndicatorProps } from '@cbhq/cds-common';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common/animation/tabs';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';

import { Animated } from '../../animation/Animated';

type UseAnimateTabIndicator = {
  widthRef: RefObject<HTMLElement>;
  xRef: RefObject<HTMLElement>;
} & Pick<TabIndicatorProps, 'width' | 'x'>;

export const useAnimateTabIndicator = ({ widthRef, width, xRef, x }: UseAnimateTabIndicator) => {
  const { getPreviousValue: getPreviousWidth, addPreviousValue: addPreviousWidth } =
    usePreviousValues<number>([0]);
  const { getPreviousValue: getPreviousX, addPreviousValue: addPreviousX } =
    usePreviousValues<number>([0]);
  addPreviousWidth(width);
  addPreviousX(x);

  useEffect(() => {
    void Animated.parallel([
      Animated.timing(widthRef, {
        property: 'transform',
        fromValue: `translateX(${getPreviousWidth()}px)`,
        toValue: `translateX(${width}px)`,
        ...animateTabIndicatorBaseSpec,
      }),
      Animated.timing(xRef, {
        property: 'transform',
        fromValue: `translateX(${getPreviousX()}px)`,
        toValue: `translateX(${x}px)`,
        ...animateTabIndicatorBaseSpec,
      }),
    ])?.start();
  }, [getPreviousX, getPreviousWidth, xRef, widthRef, width, x]);
};
