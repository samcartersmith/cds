import { useMemo, useRef } from 'react';

import { PinningDirection } from '@cbhq/cds-common';
import { Animated, LayoutRectangle, useWindowDimensions } from 'react-native';
import { MAX_OVER_DRAG } from '@cbhq/cds-common/animation/drawer';
import {
  drawerHeightThreshold,
  verticalDrawerPercentageOfView,
  horizontalDrawerPercentageOfView,
  handleBarOffset,
} from '@cbhq/cds-common/tokens/drawer';

import { convertMotionConfig } from './convertMotionConfig';

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
  const isLargeVerticalDrawer = isPinVertical && drawerPercentOfScreen > drawerHeightThreshold;
  const hasDrawerRendered = drawerDimensions[dimension] > 0;

  const duration = isLargeVerticalDrawer ? 'slow2' : 'moderate3';
  const animateDrawerInConfig = convertMotionConfig({
    toValue: 1,
    easing: 'enterFunctional',
    duration,
  });
  const animateDrawerOutConfig = convertMotionConfig({
    toValue: 0,
    easing: 'exitFunctional',
    duration,
  });

  const drawerAnimation = useRef(new Animated.Value(0));

  const animateDrawerIn = Animated.timing(drawerAnimation.current, animateDrawerInConfig);
  const animateDrawerOut = Animated.timing(drawerAnimation.current, animateDrawerOutConfig);

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
    };
  }, [animateDrawerOut, animateDrawerIn, translation, hasDrawerRendered]);
};
