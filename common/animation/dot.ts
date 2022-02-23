import { MotionBaseSpec } from '../types';

export const dotHidden = 0;
export const dotVisible = 1;

export const animateDotScaleConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'transform',
  easing: 'global',
  duration: 'slow1',
};

export const animateDotOpacityConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'opacity',
  easing: 'exitFunctional',
  duration: 'fast1',
};
