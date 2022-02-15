import { MotionBaseSpec } from '../types';

export const accordionHiddenOpacity = 0;
export const accordionVisibleOpacity = 1;
export const accordionHiddenMaxHeight = 0;
export const accordionVisibleMaxHeight = 400;
export const accordionHiddenRotate = 0;
export const accordionVisibleRotate = -180;

const easing = 'global';
const inDuration = 'slow1';
const outDurtaion = 'moderate3';

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing,
  duration: inDuration,
  toValue: accordionVisibleOpacity,
  fromValue: accordionHiddenOpacity,
};
export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing,
  duration: outDurtaion,
  toValue: accordionHiddenOpacity,
  fromValue: accordionVisibleOpacity,
};

export const animateInMaxHeightConfig: MotionBaseSpec = {
  property: 'max-height',
  easing,
  duration: inDuration,
  toValue: accordionVisibleMaxHeight,
  fromValue: accordionHiddenMaxHeight,
};
export const animateOutMaxHeightConfig: MotionBaseSpec = {
  property: 'max-height',
  easing,
  duration: outDurtaion,
  toValue: accordionHiddenMaxHeight,
  fromValue: accordionVisibleMaxHeight,
};

export const animateInRotateConfig: MotionBaseSpec = {
  property: 'transform',
  easing,
  duration: inDuration,
  toValue: 1,
  fromValue: 0,
};
export const animateOutRotateConfig: MotionBaseSpec = {
  property: 'transform',
  easing,
  duration: outDurtaion,
  toValue: 0,
  fromValue: 1,
};
