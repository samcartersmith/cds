import { MotionBaseSpec } from '../types';

const baseConfig: Pick<MotionBaseSpec, 'property' | 'easing' | 'duration'> = {
  property: 'transform',
  easing: 'enterFunctional',
  duration: 'moderate1',
};
export const animateRotate180InConfig: MotionBaseSpec = {
  ...baseConfig,
  fromValue: 0,
  toValue: 180,
};

export const animateRotate180OutConfig: MotionBaseSpec = {
  ...baseConfig,
  fromValue: 180,
  toValue: 0,
};
