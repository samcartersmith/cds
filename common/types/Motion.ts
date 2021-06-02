import { curves, durations } from '../tokens/motion';

export type MotionCurve = keyof typeof curves;
export type MotionDuration = keyof typeof durations;
