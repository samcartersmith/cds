import { IconSize } from './IconSize';
import { PinPlacement } from './Placement';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type DotVariant = 'positive' | 'negative' | 'primary' | 'foregroundMuted' | 'warning';

// There is only one type of overlap right now,
// but could potentially have more overlap types
export type DotOverlap = 'circular';

export type DotSize = IconSize;

export type DotBaseProps = {
  /** Position of dot relative to its parent */
  pin?: PinPlacement;
  /** Background color of dot */
  variant: DotVariant;
  /** Children of where the dot will anchor to */
  children?: React.ReactNode;
  /** Size of dot */
  size?: DotSize;
  /** Indicates what shape Dot is overlapping */
  overlap?: DotOverlap;
} & SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  >;
