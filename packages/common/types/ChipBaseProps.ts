import { ReactNode } from 'react';

import { DimensionValue } from './DimensionStyles';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type ChipBaseProps = {
  /** ReactNode placed in the center of the Chip */
  children: ReactNode;
  /** ReactNode placed before the value */
  start?: ReactNode;
  /** ReactNode placed after the value */
  end?: ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: DimensionValue;
  /**
   * Invert the foreground and background colors
   * @default false
   */
  inverted?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
} & SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
