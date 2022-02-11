import { MotionBaseSpec } from '../types';

export const accordionHiddenOpacity = 0;
export const accordionVisibleOpacity = 1;
export const accordionHiddenMaxHeight = 0;
export const accordionVisibleMaxHeight = 400;
export const accordionHiddenRotate = 0;
export const accordionVisibleRotate = 1;

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'global',
  duration: 'slow1',
  toValue: accordionVisibleOpacity,
  fromValue: accordionHiddenOpacity,
};
export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing: 'global',
  duration: 'moderate3',
  toValue: accordionHiddenOpacity,
  fromValue: accordionVisibleOpacity,
};

export const animateInMaxHeightConfig: MotionBaseSpec = {
  property: 'max-height',
  easing: 'global',
  duration: 'slow1',
  toValue: accordionVisibleMaxHeight,
  fromValue: accordionHiddenMaxHeight,
};
export const animateOutMaxHeightConfig: MotionBaseSpec = {
  property: 'max-height',
  easing: 'global',
  duration: 'moderate3',
  toValue: accordionHiddenMaxHeight,
  fromValue: accordionVisibleMaxHeight,
};

export const animateInRotateConfig: MotionBaseSpec = {
  property: 'transform',
  easing: 'global',
  duration: 'slow1',
  toValue: accordionVisibleRotate,
  fromValue: accordionHiddenRotate,
};

export const animateOutRotateConfig: MotionBaseSpec = {
  property: 'transform',
  easing: 'global',
  duration: 'moderate3',
  toValue: accordionHiddenRotate,
  fromValue: accordionVisibleRotate,
};
