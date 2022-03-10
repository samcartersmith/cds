import type { NoopFn } from '../Helpers';
import type { IconButtonBaseProps as DeprecatedIconButtonBaseProps } from '../IconButtonBaseProps';
import type { SharedProps } from '../SharedProps';

/** Alpha version adds testID and uses typescript generics to provide onPress type */
export type IconButtonBaseProps<OnPressFn> = DeprecatedIconButtonBaseProps & {
  onPress?: OnPressFn | NoopFn;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
} & SharedProps;
