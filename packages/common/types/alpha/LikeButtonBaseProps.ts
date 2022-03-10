import type { SharedProps } from '../SharedProps';

export type LikeButtonBaseProps<
  OnPress,
  PressableProps extends { onPress?: OnPress } & SharedProps = { onPress?: OnPress } & SharedProps,
> = PressableProps & {
  liked?: boolean;
  count?: number;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
};
