import { MotionBaseSpec } from '../types';

export const collapsibleHiddenOpacity = 0;
export const collapsibleVisibleOpacity = 1;
export const collapsibleHiddenMaxSize = 0;
// for web, mobile will be determined by content height dynamically
export const collapsibleVisibleMaxSize = 1000;
export const collapsibleHiddenRotate = 0;
export const collapsibleVisibleRotate = -180;

export const easing = 'global';
export const inDuration = 'slow1';
export const outDuration = 'moderate3';

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing,
  duration: inDuration,
  toValue: collapsibleVisibleOpacity,
  fromValue: collapsibleHiddenOpacity,
};
export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  easing,
  duration: outDuration,
  toValue: collapsibleHiddenOpacity,
  fromValue: collapsibleVisibleOpacity,
};

export const animateInMaxSizeConfig: MotionBaseSpec = {
  property: 'height',
  easing,
  duration: inDuration,
  toValue: collapsibleVisibleMaxSize,
  fromValue: collapsibleHiddenMaxSize,
};
export const animateOutMaxSizeConfig: MotionBaseSpec = {
  property: 'height',
  easing,
  duration: outDuration,
  toValue: collapsibleHiddenMaxSize,
  fromValue: collapsibleVisibleMaxSize,
};
