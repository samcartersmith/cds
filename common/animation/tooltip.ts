import { MotionBaseSpec } from '../types';

export const tooltipHiddenOpacity = 0;
export const tooltipVisibleOpacity = 1;

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  toValue: tooltipVisibleOpacity,
  fromValue: tooltipHiddenOpacity,
  duration: 'slow3',
  delay: 1,
  easing: 'enterFunctional',
};

export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  toValue: tooltipHiddenOpacity,
  fromValue: tooltipVisibleOpacity,
  duration: 'slow3',
  delay: 1,
  easing: 'exitFunctional',
};
