import { DimensionStyles } from './DimensionStyles';
import { PaletteBackground } from './Palette';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type UpsellCardBaseProps = {
  /** Text or ReactNode to be displayed in TextHeadline */
  title: React.ReactNode;
  /** Content to be displayed below the title */
  description?: React.ReactNode;
  /** Node to display for the card action */
  action?: React.ReactNode;
  /**
   * Remote Image or other node with media content.
   */
  media?: React.ReactNode;
  /**
   * Background color for the card.
   * @default 'primaryWash'
   */
  background?: PaletteBackground;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetBackground?: string;
} & SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Pick<DimensionStyles, 'width'>;
