import { SharedProps } from './SharedProps';

export type FloatingAssetCardBaseProps = {
  /** Text or ReactNode to be displayed above Title */
  subtitle?: React.ReactNode;
  /** Text or ReactNode to be displayed in TextHeadline */
  title: React.ReactNode;
  /** Content to be displayed below the title */
  description?: React.ReactNode;
  /**
   * Remote Image or other node with media content.
   */
  media: React.ReactNode;
  /**
   * Variant for card size. Can be small or large.
   * @default 's'
   */
  size?: 's' | 'l';
} & SharedProps;
