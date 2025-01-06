import { Animated, StyleProp, ViewStyle } from 'react-native';
import { LottieBaseProps, SharedProps } from '@cbhq/cds-common2';

import { BoxProps } from '../layout';

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
  animated?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
} & Omit<LottieBaseProps, 'aspectRatio'> &
  SharedProps &
  Pick<BoxProps, 'aspectRatio'>;
