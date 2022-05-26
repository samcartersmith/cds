import type { TargetAndTransition, Transition, Variant } from 'framer-motion';
import type { MotionBaseSpec, MotionCurve, MotionDuration } from '@cbhq/cds-common';

export type MotionSpec = {
  toValue: MotionBaseSpec['toValue'] | string; // allow string values like scale(0.5)
  fromValue?: MotionBaseSpec['fromValue'] | string;
} & Omit<MotionBaseSpec, 'toValue' | 'fromValue'>;

export type MotionState = 'enter' | 'exit';
export type MotionVariant = {
  enter?: Variant;
  exit?: Variant;
};

export type MotionConfigs =
  | MotionSpec[]
  | { tokens: MotionSpec[]; transitionEnd?: TargetAndTransition['transitionEnd'] };

export type MotionTransition = {
  /**
   * CDS motion easing token
   */
  easing?: MotionCurve;
  /**
   * CDS motion duration token
   */
  duration?: MotionDuration;
} & Transition;
