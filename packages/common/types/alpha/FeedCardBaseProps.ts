import type { SharedProps } from '../SharedProps';

import type { ButtonBaseProps } from './ButtonBaseProps';
import type { CardBaseProps } from './CardBaseProps';
import type { CardMediaIllustrationName, CardMediaPlacement } from './CardMediaProps';
import type { IconButtonBaseProps } from './IconButtonBaseProps';
import type { LikeButtonBaseProps } from './LikeButtonBaseProps';

export type FeedCardBaseProps<OnPressFn> = {
  /** Image url for Avatar */
  avatar?: string;
  /** Source of the card info. Typically this text is associated with the avatar. */
  author?: string;
  /** Metadata to be displayed under author text. */
  metadata?: string;
  /** The name of the Illustration to use in CardMedia. */
  illustration?: CardMediaIllustrationName;
  /** The image url to use in the CardMedia. Will not be used if illustration is present. */
  image?: string;
  /** Above places media above text content, start & end places media to the side of text content
   * @default above for mobile, start for web. Web will need to handle responsiveness changes manually.
   */
  mediaPlacement?: Exclude<CardMediaPlacement, 'end'>;
  /** Text to be displayed in TextHeadline under CardHeader section. */
  title: string;
  /** Text to be displayed in TextLabel2 under title. */
  description: string;
  /** IconButton to show in top-right of FeedCard. Takes props for IconButton */
  headerAction?: IconButtonBaseProps<OnPressFn>;
  like?: LikeButtonBaseProps<OnPressFn>;
  comment?: Omit<IconButtonBaseProps<OnPressFn>, 'name'>;
  share?: Omit<IconButtonBaseProps<OnPressFn>, 'name'>;
  cta?: ButtonBaseProps<OnPressFn>;
} & CardBaseProps<OnPressFn> &
  SharedProps;
