import type { ButtonBaseProps as DeprecatedButtonBaseProps } from '../ButtonBaseProps';
import type { NoopFn } from '../Helpers';
import type { SharedProps } from '../SharedProps';

/** Alpha version adds testID and uses typescript generics to provide onPress type */
export type ButtonBaseProps<OnPressFn> = DeprecatedButtonBaseProps & {
  onPress?: OnPressFn | NoopFn;
  /**
   * When provided the Button text will not truncate and will wrap until the number of lines provided is met.
   * @default 1
   */
  numberOfLines?: number;
} & SharedProps;
