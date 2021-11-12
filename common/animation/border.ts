import { MotionBaseSpec } from '../types';

export const animateInputBorderInConfig: Omit<MotionBaseSpec, 'property'> = {
  toValue: 1,
  easing: 'enterFunctional',
  duration: 'moderate1',
  useNativeDriver: false,
};

export const animateInputBorderOutConfig: Omit<MotionBaseSpec, 'property'> = {
  toValue: 0,
  easing: 'exitFunctional',
  duration: 'moderate1',
  useNativeDriver: false,
};
