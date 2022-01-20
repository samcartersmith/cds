import { MotionBaseSpec } from '../types';

type ProgressMotionBaseSpec = Pick<MotionBaseSpec, 'easing' | 'duration'>;

export const animateProgressBaseSpec: ProgressMotionBaseSpec = {
  easing: 'global',
  duration: 'slow3',
};
