import { MotionBaseSpec } from '../types';

export const paddleHiddenOpacity = 0;
export const paddleVisibleOpacity = 1;

export const animatePaddleConfig: Omit<MotionBaseSpec, 'toValue' | 'fromValue'> = {
  property: 'opacity',
  easing: 'enterFunctional',
  duration: 'moderate1',
};
