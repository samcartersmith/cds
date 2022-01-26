import { ReactNode } from 'react';

import { IconSize } from './IconSize';
import { PaletteForeground } from './Palette';
import { PinPlacement } from './Placement';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type DotVariant = Extract<
  PaletteForeground,
  'positive' | 'negative' | 'primary' | 'foregroundMuted'
>;

export type DotSize = Extract<IconSize, 'l' | 'm' | 's'>;

export type DotBaseProps = {
  /** Position of dot relative to its parent */
  pin?: PinPlacement;
  /** background color of dot */
  variant: DotVariant;
  /** children of where the dot will anchor to */
  children?: ReactNode;
  /** Size of dot */
  size?: DotSize;
} & SharedProps &
  SharedAccessibilityProps;
