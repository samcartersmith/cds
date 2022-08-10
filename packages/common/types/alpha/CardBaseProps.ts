import type {
  BorderedStyles,
  BoxA11yProps,
  BoxBackgroundProps,
  FlexStyles,
  StackBaseProps,
} from '../BoxBaseProps';
import type { DimensionStyles } from '../DimensionStyles';
import { SharedAccessibilityProps } from '../SharedAccessibilityProps';
import type { SharedProps } from '../SharedProps';
import type { OffsetProps, SpacingProps } from '../SpacingProps';

export type CardBoxProps = SharedProps &
  SpacingProps &
  FlexStyles &
  OffsetProps &
  DimensionStyles &
  StackBaseProps &
  BorderedStyles &
  BoxA11yProps &
  BoxBackgroundProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

export type CardBaseProps<T> = {
  /** The callback function to trigger when the entire Card is pressed. */
  onPress?: T;
  /**
   * How content should overflow if it exceeds a Card's fixed width/height
   * @default hidden
   */
  overflow?: 'hidden' | 'visible';
} & CardBoxProps;
