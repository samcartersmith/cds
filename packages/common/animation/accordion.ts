import { MotionBaseSpec } from '../types';
import { easing, inDuration, outDuration } from './collapsible';

export const accordionVisibleMaxHeight = { dense: 200, normal: 400 };
export const accordionHiddenRotate = 0;
export const accordionVisibleRotate = 180;

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
  duration: outDuration,
  toValue: 0,
  fromValue: 1,
};
