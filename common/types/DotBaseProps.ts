import { ReactNode } from 'react';
import { IconSize } from './IconSize';
import { PaletteBackground } from './Palette';
import { SharedProps } from './SharedProps';
import { BadgePlacement } from './Placement';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';

export type DotBaseProps = {
  /** Position of dot relative to its children */
  placement?: BadgePlacement;
  /** background color of dot */
  variant: Extract<PaletteBackground, 'positive' | 'negative'>;
  /** children of where the dot will anchor to */
  children?: ReactNode;
  /** Size of dot */
  size?: IconSize;
} & SharedProps &
  SharedAccessibilityProps;
