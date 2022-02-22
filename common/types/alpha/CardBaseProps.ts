import type { BorderedStyles, FlexStyles, StackBaseProps } from '../BoxBaseProps';
import type { DimensionStyles } from '../DimensionStyles';
import type { SharedProps } from '../SharedProps';
import type { OffsetProps, SpacingProps } from '../SpacingProps';

export type CardBoxProps = SharedProps &
  SpacingProps &
  FlexStyles &
  OffsetProps &
  DimensionStyles &
  StackBaseProps &
  BorderedStyles;

export type CardBaseProps<T> = {
  /** The callback function to trigger when the entire Card is pressed. This will not be used if Card has an onActionPress. */
  onPress?: T;
} & CardBoxProps;
