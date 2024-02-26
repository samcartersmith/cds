import { ReactNode } from 'react';
import { PictogramName, SpotSquareName } from '@cbhq/cds-illustrations';

import { CardBoxProps } from './CardBaseProps';
import { CardMediaPlacement } from './CardMediaProps';
import { DimensionStyles } from './DimensionStyles';
import { SharedProps } from './SharedProps';

export type CardBodyOrientationProps = {
  /** Vertical places media above text content, Horizontal places media to the side of text content */
  orientation?: 'vertical' | 'horizontal';
};

export type CardBodyBaseProps = {
  /** Text to be displayed in TextHeadline when it's a string, unless you pass a ReactNode */
  title?: ReactNode;
  /** Text to be displayed in TextBody when it's a string, unless you pass a ReactNode */
  description?: ReactNode;
  /**
   * Maximum number of lines shown. Text that exceeds will be truncated.
   * Only applies to description
   * @default 3
   */
  numberOfLines?: number;
  /** Enables compact spacing around CardBody content */
  compact?: boolean;
  children?: ReactNode;
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
  /**
   * Call to action to display underneath title and description.
   * When actionLabel and onActionPress are present this will assign action to <CardBodyAction onPress={onActionPress} endIcon="forwardArrow">{actionLabel}</CardBodyAction>.
   * Internally CardBodyAction is a normal CDS Button, but with some default props designed specifically for this layout.
   */
  action?: React.ReactNode;
} & SharedProps &
  DimensionStyles &
  CardBoxProps;
