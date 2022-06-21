import { ReactNode } from 'react';

export type PulseVariant = 'moderate' | 'subtle' | 'heavy';

export type PulseBaseProps = {
  /**
   * Variant controls opacity of the pulse
   * @default moderate
   */
  variant?: PulseVariant;
  children: ReactNode;
};
