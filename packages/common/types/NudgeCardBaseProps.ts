import { ReactNode } from 'react';

import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { IllustrationPictogramNames } from './IllustrationNames';
import { PaletteBackground } from './Palette';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type NudgeCardBaseProps = {
  /** Text or ReactNode to be displayed above the description in a TextHeadline */
  title?: ReactNode;
  /** Text or ReactNode to be displayed below the title in a TextBody */
  description?: ReactNode;
  /** If you pass a Pictogram name it will render a Pictogram to the right of the text content */
  pictogram?: IllustrationPictogramNames;
  /** Pass any node to be rendered to the right of the text content */
  media?: ReactNode;
  /** Text or ReactNode to display as the call to action */
  action?: ReactNode;
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
  /**
   * Background color for the card.
   * @default backgroundAlternate
   */
  background?: PaletteBackground;
} & Omit<DimensionStyles, 'minHeight' | 'width'> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
