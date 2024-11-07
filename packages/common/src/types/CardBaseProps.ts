import type {
  BorderedStyles,
  BoxA11yProps,
  BoxBackgroundProps,
  FlexStyles,
  PinningDirection,
  StackBaseProps,
} from './BoxBaseProps';
import type { DimensionStyles } from './DimensionStyles';
import type { ElevationLevels } from './ElevationLevels';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import type { SharedProps } from './SharedProps';
import type { OffsetProps, SpacingProps } from './SpacingProps';

export type CardVariant = 'announcement' | 'feed' | 'feature';
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

export type CardBaseProps = {
  /** Determines box shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Size of the card. Small and medium have fixed widths and large grows with its children. */
  size?: 'small' | 'medium' | 'large';
  /** How content should overflow if it exceeds a Card's fixed width/height */
  overflow?: 'hidden' | 'visible';
  /** Don't scale Card on press. */
  noScaleOnPress?: boolean;
  children?: React.ReactNode;
} & CardBoxProps;
