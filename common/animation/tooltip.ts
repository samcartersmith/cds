import { MotionBaseSpec } from '../types';

export const tooltipHiddenOpacity = 0;
export const tooltipVisibleOpacity = 1;

export const tooltipHiddenY = 2;
export const tooltipVisibleY = 0;

const baseAnimation: Pick<MotionBaseSpec, 'duration' | 'delay'> = {
  duration: 'fast1',
  delay: 25,
};

export const animateInOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  ...baseAnimation,
  easing: 'enterFunctional',
  toValue: tooltipVisibleOpacity,
  fromValue: tooltipHiddenOpacity,
};

export const animateOutOpacityConfig: MotionBaseSpec = {
  property: 'opacity',
  ...baseAnimation,
  easing: 'exitFunctional',
  toValue: tooltipHiddenOpacity,
  fromValue: tooltipVisibleOpacity,
};

export const animateInYConfig: MotionBaseSpec = {
  property: 'transform',
  ...baseAnimation,
  easing: 'enterFunctional',
  toValue: tooltipVisibleY,
  fromValue: tooltipHiddenY,
};

export const animateOutYConfig: MotionBaseSpec = {
  property: 'transform',
  ...baseAnimation,
  easing: 'exitFunctional',
  toValue: tooltipHiddenY,
  fromValue: tooltipVisibleY,
};
