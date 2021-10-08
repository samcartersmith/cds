import type { MotionSpec } from '../types';

export const carouselVisibleOpacity = 1;
export const carouselDismissOpacity = 0;
export const carouselVisibleSize = 1;
export const carouselDismissSize = 0;

export const animateOpacityConfig: MotionSpec = {
  property: 'opacity',
  easing: 'exitFunctional',
  duration: 'fast1',
  toValue: carouselDismissOpacity,
  fromValue: carouselVisibleOpacity,
  useNativeDriver: false,
};

export const animateSizeConfig: MotionSpec = {
  property: 'size',
  easing: 'global',
  duration: 'slow1',
  toValue: carouselDismissSize,
  fromValue: carouselVisibleSize,
  delay: 50,
  useNativeDriver: false,
};
