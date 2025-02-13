import { ButtonBaseProps } from './ButtonBaseProps';
import { CardBaseProps } from './CardBaseProps';
import { CardBodyBaseProps } from './CardBodyBaseProps';
import { CardMediaPlacement } from './CardMediaProps';
import { IconButtonBaseProps } from './IconButtonBaseProps';
import { LikeButtonBaseProps } from './LikeButtonBaseProps';
import { SharedProps } from './SharedProps';

export type FeedCardBaseProps<OnPressFn = () => void> = {
  /** Image url for Avatar */
  avatar?: string;
  /** Source of the card info. Typically this text is associated with the avatar. */
  author?: string;
  /** Metadata to be displayed under author text. */
  metadata?: string;
  /** Above places media above text content, start & end places media to the side of text content
   * @default above for mobile, start for web. Web will need to handle responsiveness changes manually.
   */
  mediaPlacement?: Exclude<CardMediaPlacement, 'end'>;
  /** Text to be displayed in TextHeadline under CardHeader section. */
  title: string;
  /** Text to be displayed in TextLabel2 under title. */
  description: string;
  /** IconButton to show in top-right of FeedCard. Takes props for IconButton */
  headerAction?: IconButtonBaseProps & { onPress?: OnPressFn };
  like?: LikeButtonBaseProps;
  comment?: Omit<IconButtonBaseProps, 'name'>;
  share?: Omit<IconButtonBaseProps, 'name'>;
  cta?: ButtonBaseProps;
} & CardBaseProps &
  SharedProps &
  Pick<CardBodyBaseProps, 'image' | 'pictogram' | 'spotSquare'>;
