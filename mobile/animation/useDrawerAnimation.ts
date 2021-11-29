import { useMemo, useRef } from 'react';

import { PinningDirection } from '@cbhq/cds-common';
import { Animated, useWindowDimensions } from 'react-native';
import { MAX_OVER_DRAG } from '@cbhq/cds-common/animation/drawer';
import { convertMotionConfig } from './convertMotionConfig';

const animateInConfig = convertMotionConfig({
  toValue: 1,
  easing: 'enterFunctional',
  duration: 'moderate3',
});

const animateOutConfig = convertMotionConfig({
  toValue: 0,
  easing: 'exitFunctional',
  duration: 'moderate2',
});

export const useDrawerAnimation = (pin: PinningDirection | undefined = 'bottom') => {
  const { width, height } = useWindowDimensions();

  const drawerAnimation = useRef(new Animated.Value(0));

  const animateDrawerIn = Animated.timing(drawerAnimation.current, animateInConfig);
  const animateDrawerOut = Animated.timing(drawerAnimation.current, animateOutConfig);

  const translation = useMemo(() => {
    switch (pin) {
      case 'top':
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-height * 0.75, -MAX_OVER_DRAG],
          }),
        };
      case 'left':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [-width * 0.85, -MAX_OVER_DRAG],
          }),
        };
      case 'bottom':
      default:
        return {
          translateY: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [height * 0.75, MAX_OVER_DRAG],
          }),
        };
      case 'right':
        return {
          translateX: drawerAnimation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [width * 0.85, MAX_OVER_DRAG],
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
