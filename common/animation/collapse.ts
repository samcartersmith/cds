import { MotionBaseSpec } from '../types';

export const collapseHiddenOpacity = 0;
export const collapseVisibleOpacity = 1;
export const collapseHiddenMaxHeight = 0;
// for web, mobile will be determined by content height dynamically
export const collapseVisibleMaxHeight = 1000;
export const collapseHiddenRotate = 0;
export const collapseVisibleRotate = -180;

export const easing = 'global';
export const inDuration = 'slow1';
export const outDuration = 'moderate3';

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing,
  duration: inDuration,
  toValue: collapseVisibleOpacity,
  fromValue: collapseHiddenOpacity,
};
export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing,
  duration: outDuration,
  toValue: collapseHiddenOpacity,
  fromValue: collapseVisibleOpacity,
};

export const animateInMaxHeightConfig: MotionBaseSpec = {
  property: 'height',
  easing,
  duration: inDuration,
  toValue: collapseVisibleMaxHeight,
  fromValue: collapseHiddenMaxHeight,
};
export const animateOutMaxHeightConfig: MotionBaseSpec = {
  property: 'height',
  easing,
  duration: outDuration,
  toValue: collapseHiddenMaxHeight,
  fromValue: collapseVisibleMaxHeight,
};
