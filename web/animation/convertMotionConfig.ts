import { curves, durations } from '@cbhq/cds-common/tokens/motion';
import type { MotionSpec as DefaultMotionSpec } from '@cbhq/cds-common/types';

export const webCurves = {
  global: curves.global.join(),
  enterExpressive: curves.enterExpressive.join(),
  enterFunctional: curves.enterFunctional.join(),
  exitExpressive: curves.exitExpressive.join(),
  exitFunctional: curves.exitFunctional.join(),
};

export type MotionSpec = {
  toValue: number | string; // allow strings such as 'scale(0)' on web
  fromValue?: number | string;
} & Omit<DefaultMotionSpec, 'toValue' | 'fromValue' | 'property'> &
  Pick<EffectTiming, 'fill'>;

export type MotionConfigOutput = { easing: string; duration: number } & EffectTiming &
  Pick<MotionSpec, 'toValue' | 'fromValue' | 'fill'>;

export const convertMotionConfig = ({
  toValue,
  fromValue,
  delay,
  easing,
  duration,
  /**
   * Retain styles after animation has completed
   * @link https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming/fill
   */
  fill = 'forwards',
}: MotionSpec): MotionConfigOutput => {
  return {
    toValue,
    fromValue,
    easing: `cubic-bezier(${webCurves[easing]})`,
    duration: durations[duration],
    delay,
    fill,
  };
};
