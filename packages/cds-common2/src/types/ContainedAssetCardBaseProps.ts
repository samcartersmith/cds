import { SharedProps } from './SharedProps';

export type ContainedAssetCardBaseProps = {
  /** Text or ReactNode to be displayed above Title */
  subtitle?: React.ReactNode;
  /** Text or ReactNode to be displayed in TextHeadline */
  title: React.ReactNode;
  /** Content to be displayed below the title */
  description?: React.ReactNode;
  /**
   * Header to display Remote Image or other content.
   */
  header: React.ReactNode;
  /**
   * Variant for card size. Can be small or large.
   * @default 's'
   */
  size?: 's' | 'l';
  /**
   * Children to be rendered in the card
   */
  children?: React.ReactNode;
} & SharedProps;
