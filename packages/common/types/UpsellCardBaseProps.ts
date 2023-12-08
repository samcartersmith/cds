import { ReactNode } from 'react';

import { DimensionStyles } from './DimensionStyles';
import { NoopFn } from './Helpers';
import { PaletteBackground } from './Palette';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type UpsellCardBaseProps = {
  /** Text or ReactNode to be displayed in TextHeadline */
  title: ReactNode;
  /** Content to be displayed below the title */
  description?: ReactNode;
  /** Node to display for the card action */
  action?: ReactNode;
  /** Callback fired when the action button is pressed */
  onActionPress?: NoopFn;
  /** Callback fired when the dismiss button is pressed */
  onDismissPress?: NoopFn;
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
