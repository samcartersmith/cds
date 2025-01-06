import { ThemeVars } from '../new/vars';

import { DimensionStyles, DimensionValue } from './DimensionStyles';
import { IllustrationPictogramNames } from './IllustrationNames';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type NudgeCardBaseProps = {
  /** Text or ReactNode to be displayed above the description in a TextHeadline */
  title?: React.ReactNode;
  /** Text or ReactNode to be displayed below the title in a TextBody */
  description?: React.ReactNode;
  /** If you pass a Pictogram name it will render a Pictogram to the right of the text content */
  pictogram?: IllustrationPictogramNames;
  /** Pass any node to be rendered to the right of the text content */
  media?: React.ReactNode;
  /** Text or ReactNode to display as the call to action */
  action?: React.ReactNode;
  /**
   * Maximum number of lines shown for the title and description text. Text that exceeds will be truncated.
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
  background?: ThemeVars.Color;
  /**
   * Set the media position for the pictogram or media.
   * @default right
   */
  mediaPosition?: 'left' | 'right';
} & Omit<DimensionStyles, 'minHeight' | 'width'> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
