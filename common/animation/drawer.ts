import { MotionBaseSpec } from '../types';

/** Upper limit for how much the drawer can be extended in length by panning */
export const MAX_OVER_DRAG = 40;
/** Dragging the handle down by more than this distance will dismiss the Tray */
export const DISMISSAL_DRAG_THRESHOLD = 150;
/** Quick swipes will dismiss the Tray, especially useful for Trays that are very short */
export const DISMISSAL_VELOCITY_THRESHOLD = 0.8;
/** Minimum panning distance required to capture pan gesture */
export const MIN_PAN_DISTANCE = 2;

export const animateHorizontalDrawerInConfig: MotionBaseSpec = {
  property: 'transform',
  toValue: 1,
  easing: 'enterFunctional',
  duration: 'moderate3',
};
export const animateHorizontalDrawerOutConfig: MotionBaseSpec = {
  property: 'transform',
  toValue: 0,
  easing: 'exitFunctional',
  duration: 'moderate3',
};

export const animateVerticalDrawerInConfig: MotionBaseSpec = {
  property: 'transform',
  toValue: 1,
  easing: 'enterFunctional',
  duration: 'slow2',
};
export const animateVerticalDrawerOutConfig: MotionBaseSpec = {
  property: 'transform',
  toValue: 0,
  easing: 'exitFunctional',
  duration: 'slow2',
};
