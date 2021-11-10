import { useMemo, useRef } from 'react';

import { PinningDirection } from '@cbhq/cds-common';
import { Animated, useWindowDimensions } from 'react-native';
import {
  animateDrawerInConfig,
  animateDrawerOutConfig,
  MAX_OVER_DRAG,
} from '@cbhq/cds-common/animation/drawer';
import { convertMotionConfig } from './convertMotionConfig';

type DrawerAnimation = {
  drawerAnimation: Animated.Value;
  animateDrawerOut: Animated.CompositeAnimation;
  animateDrawerIn: Animated.CompositeAnimation;
  drawerAnimationStyles: {
    transform: (
      | {
          translateY: Animated.AnimatedInterpolation;
          translateX?: Animated.AnimatedInterpolation;
        }
      | {
          translateX: Animated.AnimatedInterpolation;
          translateY?: Animated.AnimatedInterpolation;
        }
    )[];
  };
};

export const useDrawerAnimation = (
  pin: PinningDirection | undefined = 'bottom',
): DrawerAnimation => {
  const { width, height } = useWindowDimensions();

  const drawerAnimation = useRef(new Animated.Value(0));
  const animateDrawerIn = Animated.timing(
    drawerAnimation.current,
    convertMotionConfig(animateDrawerInConfig),
  );
  const animateDrawerOut = Animated.timing(
    drawerAnimation.current,
    convertMotionConfig(animateDrawerOutConfig),
  );

  const translation = useMemo(() => {
    switch (pin) {
      case 'top':
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-height, -MAX_OVER_DRAG],
          }),
        };
      case 'left':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, -MAX_OVER_DRAG],
          }),
        };
      case 'bottom':
      default:
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [height, MAX_OVER_DRAG],
          }),
        };
      case 'right':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [width, MAX_OVER_DRAG],
          }),
        };
    }
  }, [pin, height, width]);

  return useMemo(() => {
    return {
      drawerAnimation: drawerAnimation.current,
      animateDrawerOut,
      animateDrawerIn,
      drawerAnimationStyles: { transform: [translation] },
    };
  }, [animateDrawerOut, animateDrawerIn, translation]);
};
