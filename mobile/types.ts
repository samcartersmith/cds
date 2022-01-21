import { Animated, StyleProp } from 'react-native';
import { themePartialElevation1 } from '@cbhq/cds-common/themes/themeElevation1';
import { themePartialElevation2 } from '@cbhq/cds-common/themes/themeElevation2';
import { themePartialElevation1Children } from '@cbhq/cds-common/themes/themeElevation1Children';
import { themePartialElevation2Children } from '@cbhq/cds-common/themes/themeElevation2Children';

type ComponentProps = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: StyleProp<{}>;
};

export type OmitStyle<Props extends ComponentProps, ExtraProps extends string = ''> = Omit<
  Props,
  'style' | ExtraProps
>;

export type DangerouslySetStyle<T, IsAnimated extends boolean = boolean> = {
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
};

export type HapticFeedbackType = 'light' | 'normal' | 'heavy' | 'none';

export type ElevationThemeConfig = typeof themePartialElevation1 | typeof themePartialElevation2;
export type ElevationChildrenThemeConfig =
  | typeof themePartialElevation1Children
  | typeof themePartialElevation2Children;
