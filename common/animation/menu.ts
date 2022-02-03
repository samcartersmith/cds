import { MotionBaseSpec } from '../types';

export const animateMenuOpacityInConfig: MotionBaseSpec = {
  property: 'opacity',
  fromValue: 0,
  toValue: 1,
  easing: 'global',
  duration: 'moderate3',
};

export const animateMenuOpacityOutConfig: MotionBaseSpec = {
  property: 'opacity',
  fromValue: 1,
  toValue: 0,
  easing: 'global',
  duration: 'moderate3',
};

export const animateMenuTransformInConfig: MotionBaseSpec = {
  property: 'transform',
  fromValue: -16,
  toValue: 0,
  easing: 'global',
  duration: 'moderate3',
};

export const animateMenuTransformOutConfig: MotionBaseSpec = {
  property: 'transform',
  fromValue: 0,
  toValue: -16,
  easing: 'global',
  duration: 'moderate3',
};
