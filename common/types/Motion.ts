import { curves, durations } from '../tokens/motion';

export type MotionCurve = keyof typeof curves;
export type MotionDuration = keyof typeof durations;

export type MotionSpec = {
  property: string;
  toValue: number;
  easing: MotionCurve;
  duration: MotionDuration;
  fromValue?: number;
  delay?: number;
  useNativeDriver?: boolean;
};
