import { MotionBaseSpec } from '../types';

type TabIndicatorMotionBaseSpec = Pick<MotionBaseSpec, 'easing' | 'duration'>;

export const animateTabIndicatorBaseSpec: TabIndicatorMotionBaseSpec = {
  easing: 'global',
  duration: 'moderate1',
};
