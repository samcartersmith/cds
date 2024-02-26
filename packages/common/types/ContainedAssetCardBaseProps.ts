import { ReactNode } from 'react';

import { SharedProps } from './SharedProps';

export type ContainedAssetCardBaseProps = {
  /** Text or ReactNode to be displayed above Title */
  subtitle?: ReactNode;
  /** Text or ReactNode to be displayed in TextHeadline */
  title: ReactNode;
  /** Content to be displayed below the title */
  description?: ReactNode;
  /**
   * Header to display Remote Image or other content.
   */
  header: ReactNode;
  /**
   * Variant for card size. Can be small or large.
   * @default 's'
   */
  size?: 's' | 'l';
  /**
   * Children to be rendered in the card
   */
  children?: ReactNode;
} & SharedProps;
