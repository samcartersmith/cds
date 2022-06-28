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
} & HintMotionBaseProps;

export type PulseRefBaseProps = {
  play: (variant?: PulseVariant) => Promise<void>;
  stop: () => void;
};
