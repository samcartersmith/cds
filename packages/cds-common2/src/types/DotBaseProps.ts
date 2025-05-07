import { IconSize } from './IconSize';
import { PinPlacement } from './Placement';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type DotVariant = 'positive' | 'negative' | 'primary' | 'foregroundMuted' | 'warning';

// There is only one type of overlap right now,
// but could potentially have more overlap types
export type DotOverlap = 'circular';

export type DotSize = IconSize;
