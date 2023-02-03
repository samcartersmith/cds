import type { PictogramName, SpotSquareName } from '../IllustrationProps';

import type { CardBoxProps } from './CardBaseProps';
import type { CardMediaPlacement } from './CardMediaProps';

export type CardBodyBaseProps<OnPressFn> = {
  /** Text to be displayed in TextHeadline. */
  title?: string;
  /** Text to be displayed in TextLabel2. */
  description?: string;
  /** Above places media above text content, start or end places media to the side of text content
   * @default end
   */
  mediaPlacement?: CardMediaPlacement;
  /** The name of the SpotSquare Illustration to use in CardMedia. */
  spotSquare?: SpotSquareName;
  /** The name of the Pictogram Illustration to use in CardMedia. */
  pictogram?: PictogramName;
  /** The image url to use in the CardMedia. Will not be used if illustration is present. */
  image?: string;
  /**
   * Remote Image or other node with media content.
   * If illustration prop is present this will default to <CardMedia type="illustration" name={illustration} variant={variant} />.
   * If image prop is present this will default to <CardMedia type="image" src={image} variant={variant} />.
   */
  media?: React.ReactNode;
  /**
   * Call to action to display underneath title and description.
   * When present this will set action prop to be CardBodyAction with some defaults.
   */
  actionLabel?: string;
  /** Callback to trigger when the call to action is pressed. actionLabel is required for this to work.  */
  onActionPress?: OnPressFn;
  /**
   * Call to action to display underneath title and description.
   * When actionLabel and onActionPress are present this will assign action to <CardBodyAction onPress={onActionPress} endIcon="forwardArrow">{actionLabel}</CardBodyAction>.
   * Internally CardBodyAction is a normal CDS Button, but with some default props designed specifically for this layout.
   */
  action?: React.ReactNode;
  /**
   * Maximum number of lines to use for title and description. Text that exceeds will be truncated.
   * @default 3
   */
  numberOfLines?: number;
} & CardBoxProps;
