import { MotionSpec } from '../types';

export const modalHiddenOpacity = 0;
export const modalHiddenScale = 0.98;
export const modalVisibleOpacity = 1;
export const modalVisibleScale = 1;

export const animateInOpacityConfig: MotionSpec = {
  property: 'opacity',
  easing: 'enterFunctional',
  duration: 'fast1',
  toValue: modalVisibleOpacity,
  fromValue: modalHiddenOpacity,
};
export const animateOutOpacityConfig: MotionSpec = {
  property: 'opacity',
  easing: 'global',
  duration: 'fast1',
  toValue: modalHiddenOpacity,
  fromValue: modalVisibleOpacity,
};

export const animateInScaleConfig: MotionSpec = {
  property: 'scale',
  easing: 'enterFunctional',
  duration: 'moderate3',
  toValue: modalVisibleScale,
  fromValue: modalHiddenScale,
};
export const animateOutScaleConfig: MotionSpec = {
  property: 'scale',
  easing: 'global',
  duration: 'fast1',
  toValue: modalHiddenScale,
  fromValue: modalVisibleScale,
};
