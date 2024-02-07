import { ReactNode } from 'react';

import { HintMotionBaseProps } from './MotionBaseProps';

export type PulseVariant = 'moderate' | 'subtle' | 'heavy';

export type PulseBaseProps = {
  /**
   * Variant controls opacity of the pulse
   * @default moderate
   */
  variant?: PulseVariant;
  children: ReactNode;
  /**
   * Specifies the number of times the pulse animation should loop.
   * Provide a positive integer to define an exact number of loops.
   * To enable infinite looping, omit this property or leave it undefined.
   * By default, the animation loops infinitely if this property is not specified.
   * @default Infinity
   */
  iterations?: number;
} & HintMotionBaseProps;

export type PulseRefBaseProps = {
  play: (variant?: PulseVariant) => Promise<void>;
  stop: () => void;
};
