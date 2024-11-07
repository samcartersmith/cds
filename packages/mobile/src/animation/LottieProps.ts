import { Animated, ViewStyle } from 'react-native';
import { LottieBaseProps, SharedProps } from '@cbhq/cds-common';

import { BoxProps } from '../layout';
import { DangerouslySetStyle } from '../types';

export type LottieProps = {
  /**
   * A number between 0 and 1, or an `Animated` number between 0 and 1. This number
   * represents the normalized progress of the animation. If you update this prop, the
   * animation will correspondingly update to the frame at that progress value. This
   * prop is not required if you are using the imperative API.
   */
  progress?: number | Animated.Value | Animated.AnimatedInterpolation<number>;
  /**
   * An array of layers you want to override its color filter.
   */
  colorFilters?: { keypath: string; color: string }[];
} & Omit<LottieBaseProps, 'aspectRatio'> &
  SharedProps &
  DangerouslySetStyle<ViewStyle> &
  Pick<BoxProps, 'aspectRatio'>;
