import { useRef, useMemo } from 'react';
import { Animated } from 'react-native';
import { MotionBaseSpec } from '@cbhq/cds-common';
import { convertMotionConfig } from './convertMotionConfig';

type SelectInputAnimation = {
  rotateAnimation: Animated.Value;
  animateRotateIn: Animated.CompositeAnimation;
  animateRotateOut: Animated.CompositeAnimation;
  rotateAnimationStyles: {
    transform: {
      rotate: Animated.AnimatedInterpolation;
    }[];
  };
};

export const useRotateAnimation = (
  animateInConfig: MotionBaseSpec,
  animateOutConfig: MotionBaseSpec,
  degree: number,
): SelectInputAnimation => {
  const rotateAnimation = useRef(new Animated.Value(0));

  const animateRotateIn = Animated.timing(
    rotateAnimation.current,
    convertMotionConfig(animateInConfig),
  );
  const animateRotateOut = Animated.timing(
    rotateAnimation.current,
    convertMotionConfig(animateOutConfig),
  );

  const translation = useMemo(() => {
    return {
      rotate: rotateAnimation.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${degree}deg`],
      }),
    };
  }, [rotateAnimation, degree]);

  return useMemo(() => {
    return {
      rotateAnimation: rotateAnimation.current,
      animateRotateIn,
      animateRotateOut,
      rotateAnimationStyles: { transform: [translation] },
    };
  }, [rotateAnimation, animateRotateIn, animateRotateOut, translation]);
};
