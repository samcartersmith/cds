import { ReactNode } from 'react';

import { NoopFn } from './Helpers';
import { SharedProps } from './SharedProps';

export type ContainedAssetCardBaseProps = {
  /** Text or ReactNode to be displayed above Title */
  subtitle?: ReactNode;
  /** Text or ReactNode to be displayed in TextHeadline */
  title: ReactNode;
  /** Content to be displayed below the title */
  description?: ReactNode;
  /**
   * Callback function when card is pressed.
   */
  onPress?: NoopFn;
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
