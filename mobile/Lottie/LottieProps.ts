import { LottieBaseProps } from '@cbhq/cds-common';
import { Animated } from 'react-native';

import { BoxProps } from '../Box/Box';

export interface LottieProps extends LottieBaseProps, Omit<BoxProps, 'animated'> {
  /**
   * A number between 0 and 1, or an `Animated` number between 0 and 1. This number
   * represents the normalized progress of the animation. If you update this prop, the
   * animation will correspondingly update to the frame at that progress value. This
   * prop is not required if you are using the imperative API.
   */
  progress?: number | Animated.Value | Animated.AnimatedInterpolation;
  colorFilters?: Array<{ keypath: string; color: string }>;
}
