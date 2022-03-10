import type { SharedProps } from '../SharedProps';

export type CardHeaderProps = {
  /** Image url for Avatar */
  avatar?: string;
  /** Source of the card info, which is typically associated with the avatar. */
  author?: string;
  /** Metadata to be displayed under author text. */
  metadata?: string;
  /** IconButton ReactNode */
  action?: React.ReactNode;
} & SharedProps;
