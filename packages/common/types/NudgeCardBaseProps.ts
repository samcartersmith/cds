import { ReactNode } from 'react';

import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { IllustrationPictogramNames } from './IllustrationNames';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type NudgeCardBaseProps<T> = {
  /** Text or ReactNode to be displayed above the description in a TextHeadline */
  title?: ReactNode;
  /** Text or ReactNode to be displayed below the title in a TextBody */
  description?: ReactNode;
  pictogram: IllustrationPictogramNames;
  /** Text or ReactNode to display as the call to action */
  action?: ReactNode;
  /**
   * Callback fired when the action button is pressed
   * Cannot be used when `action` is a React Element, only when `action` is a string
   */
  onActionPress?: T;
  /** Callback fired when the dismiss button is pressed */
  onDismissPress?: T;
  /**
   * Maximum number of lines shown for the description text. Text that exceeds will be truncated.
   * @default 3
   */
  numberOfLines?: number;
  /**
   * @default 327
   */
  width?: DimensionValue;
  /**
   * @default 160
   */
  minHeight?: DimensionValue;
} & Omit<DimensionStyles, 'minHeight' | 'width'> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
