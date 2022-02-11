import { useMemo, useRef } from 'react';

import { MotionBaseSpec, PinningDirection } from '@cbhq/cds-common';
import { Animated, Easing, LayoutRectangle, useWindowDimensions } from 'react-native';
import {
  animateDrawerInConfig,
  animateDrawerOutConfig,
  MAX_OVER_DRAG,
} from '@cbhq/cds-common/animation/drawer';
import {
  drawerHeightThreshold,
  verticalDrawerPercentageOfView,
  horizontalDrawerPercentageOfView,
  handleBarOffset,
} from '@cbhq/cds-common/tokens/drawer';

import { durations } from '@cbhq/cds-common/tokens/motion';
import { convertMotionConfig } from '../../animation/convertMotionConfig';

const animateLargeDrawer = {
  animateIn: convertMotionConfig({
    ...animateDrawerInConfig,
    duration: 'slow2',
  } as MotionBaseSpec),
  animateOut: convertMotionConfig({
    ...animateDrawerOutConfig,
    duration: 'slow2',
  } as MotionBaseSpec),
};

const animateSmallDrawer = {
  animateIn: convertMotionConfig({
    ...animateDrawerInConfig,
    duration: 'moderate3',
  } as MotionBaseSpec),
  animateOut: convertMotionConfig({
    ...animateDrawerOutConfig,
    duration: 'moderate3',
  } as MotionBaseSpec),
};

export const useDrawerAnimation = (
  pin: PinningDirection | undefined = 'bottom',
  drawerDimensions: LayoutRectangle,
) => {
  const windowDimensions = useWindowDimensions();

  const isPinVertical = pin === 'top' || pin === 'bottom';
  const dimension = isPinVertical ? 'height' : 'width';
  const drawerDimension = drawerDimensions[dimension]
    ? drawerDimensions[dimension]
    : windowDimensions[dimension];
  const drawerPercentOfScreen = drawerDimension / windowDimensions[dimension];
  const hasDrawerRendered = drawerDimensions[dimension] > 0;
  const isLargeVerticalDrawer = isPinVertical && drawerPercentOfScreen > drawerHeightThreshold;

  const drawerAnimation = useRef(new Animated.Value(0));

  const animateDrawerIn = useMemo(
    () =>
      Animated.timing(
        drawerAnimation.current,
        isLargeVerticalDrawer ? animateLargeDrawer.animateIn : animateSmallDrawer.animateIn,
      ),
    [isLargeVerticalDrawer],
  );
  const animateDrawerOut = useMemo(
    () =>
      Animated.timing(
        drawerAnimation.current,
        isLargeVerticalDrawer ? animateLargeDrawer.animateOut : animateSmallDrawer.animateOut,
      ),
    [isLargeVerticalDrawer],
  );

  /** custom animation config for swipe and fling to close that has no friction and is faster */
  const animateSwipeToClose = useMemo(
    () =>
      Animated.timing(drawerAnimation.current, {
        toValue: animateDrawerOutConfig.toValue,
        useNativeDriver: true,
        duration: durations.moderate3,
        easing: Easing.ease,
      }),
    [],
  );

  const translation = useMemo(() => {
    switch (pin) {
      case 'top':
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-drawerDimension * verticalDrawerPercentageOfView, -MAX_OVER_DRAG],
          }),
        };
      case 'left':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-drawerDimension * horizontalDrawerPercentageOfView, -MAX_OVER_DRAG],
          }),
        };
      case 'bottom':
      default:
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [
              (drawerDimension + handleBarOffset) * verticalDrawerPercentageOfView,
              MAX_OVER_DRAG,
            ],
          }),
        };
      case 'right':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [drawerDimension * horizontalDrawerPercentageOfView, MAX_OVER_DRAG],
          }),
        };
    }
  }, [pin, drawerDimension]);

  return useMemo(() => {
    return {
      drawerAnimation: drawerAnimation.current,
      animateDrawerOut,
      animateDrawerIn,
      drawerAnimationStyles: { transform: [translation] },
      hasDrawerRendered,
      animateSwipeToClose,
    };
  }, [animateDrawerOut, animateDrawerIn, translation, hasDrawerRendered, animateSwipeToClose]);
};
