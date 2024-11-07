import { MotionTransition } from './Motion';
import { HintMotionBaseProps } from './MotionBaseProps';

export type PulseVariant = 'moderate' | 'subtle' | 'heavy';

export type PulseBaseProps = {
  /**
   * Variant controls opacity of the pulse
   * @default moderate
   */
  variant?: PulseVariant;
  children: React.ReactNode;
  /**
   * Specifies the number of times the pulse animation should loop.
   * Provide a positive integer to define an exact number of loops.
   * To enable infinite looping, omit this property or leave it undefined.
   * By default, the animation loops infinitely if this property is not specified.
   * @default Infinity
   */
  iterations?: number;
  /**
   * Custom motion transition to override default motion config
   */
  motionConfig?: Partial<MotionTransition>;
} & HintMotionBaseProps;

export type PulseRefBaseProps = {
  play: (variant?: PulseVariant) => Promise<void>;
  stop: () => void;
};
