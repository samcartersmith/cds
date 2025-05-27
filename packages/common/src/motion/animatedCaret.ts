import { easing, inDuration } from '../animation/collapsible';
import { MotionBaseSpec } from '../types';

export const animateRotateConfig: Omit<MotionBaseSpec, 'toValue'> = {
  property: 'rotate',
  easing,
  duration: inDuration,
};
