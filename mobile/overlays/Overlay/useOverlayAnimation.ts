import { useMemo, useRef } from 'react';

import { Animated } from 'react-native';

import { convertMotionConfig } from '../../animation/convertMotionConfig';

const animateInConfig = convertMotionConfig({
  curve: 'enterFunctional',
  duration: 'moderate1',
  toValue: 1,
});
const animateOutConfig = convertMotionConfig({
  curve: 'exitFunctional',
  duration: 'moderate1',
  toValue: 0,
});

export const useOverlayAnimation = (): [
  Animated.Value,
  Animated.CompositeAnimation,
  Animated.CompositeAnimation
] => {
  const overlayAnim = useRef(new Animated.Value(0));
  return useMemo(() => {
    const animateIn = Animated.timing(overlayAnim.current, animateInConfig);
    const animateOut = Animated.timing(overlayAnim.current, animateOutConfig);
    return [overlayAnim.current, animateIn, animateOut];
  }, []);
};
