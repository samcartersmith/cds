import { Animated, StyleProp } from 'react-native';

interface ComponentProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: StyleProp<{}>;
}

export type OmitStyle<Props extends ComponentProps, ExtraProps extends string = ''> = Omit<
  Props,
  'style' | ExtraProps
>;

export interface DangerouslySetStyle<T, IsAnimated extends boolean = boolean> {
  /**
   * If value is `true` then style prop can take animated values.
   * @default false
   */
  animated?: IsAnimated;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetStyle?: IsAnimated extends true
    ? Animated.WithAnimatedValue<StyleProp<T>>
    : StyleProp<T>;
  /** Opacity of element */
  opacity?: IsAnimated extends true ? Animated.WithAnimatedValue<StyleProp<T>> : number;
}

export type HapticFeedbackType = 'light' | 'normal' | 'heavy' | 'none';
