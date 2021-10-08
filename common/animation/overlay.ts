import { MotionSpec } from '../types';

export const overlayHiddenOpacity = 0;
export const overlayVisibleOpacity = 1;

export const animateInOpacityConfig: MotionSpec = {
  property: 'opacity',
  easing: 'enterFunctional',
  duration: 'moderate1',
  toValue: overlayVisibleOpacity,
  fromValue: overlayHiddenOpacity,
};
export const animateOutOpacityConfig: MotionSpec = {
  property: 'opacity',
  easing: 'global',
  duration: 'fast1',
  toValue: overlayHiddenOpacity,
  fromValue: overlayVisibleOpacity,
};
