import { TabIndicatorProps } from '@cbhq/cds-common';
import { animateTabIndicatorBaseSpec } from '@cbhq/cds-common/animation/tabs';
import { usePreviousValues } from '@cbhq/cds-common/hooks/usePreviousValues';
import { RefObject, useEffect } from 'react';
import { Animated } from '../../animation/Animated';

type UseAnimateTabIndicator = {
  widthRef: RefObject<HTMLElement>;
  positionRef: RefObject<HTMLElement>;
} & Pick<TabIndicatorProps, 'width' | 'xPosition'>;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const useAnimateTabIndicator = ({
  widthRef,
  width,
  positionRef,
  xPosition,
}: UseAnimateTabIndicator) => {
  const { getPreviousValue: getPreviousWidth, addPreviousValue: addPreviousWidth } =
    usePreviousValues<number>([0]);
  const { getPreviousValue: getPreviousPosition, addPreviousValue: addPreviousPosition } =
    usePreviousValues<number>([0]);
  addPreviousWidth(width);
  addPreviousPosition(xPosition);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(widthRef, {
        property: 'transform',
        fromValue: `translateX(${getPreviousWidth()}px)`,
        toValue: `translateX(${width}px)`,
        ...animateTabIndicatorBaseSpec,
      }),
      Animated.timing(positionRef, {
        property: 'transform',
        fromValue: `translateX(${getPreviousPosition()}px)`,
        toValue: `translateX(${xPosition}px)`,
        ...animateTabIndicatorBaseSpec,
      }),
    ])?.start();
  }, [getPreviousPosition, getPreviousWidth, positionRef, widthRef, width, xPosition]);
};
