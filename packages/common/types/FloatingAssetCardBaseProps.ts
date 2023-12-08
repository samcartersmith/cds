import { ReactNode } from 'react';

import { NoopFn } from './Helpers';
import { SharedProps } from './SharedProps';

export type FloatingAssetCardBaseProps = {
  /** Text or ReactNode to be displayed above Title */
  subtitle?: ReactNode;
  /** Text or ReactNode to be displayed in TextHeadline */
  title: ReactNode;
  /** Content to be displayed below the title */
  description?: ReactNode;
  /**
   * Remote Image or other node with media content.
   */
  media: ReactNode;
  /**
   * Variant for card size. Can be small or large.
   * @default 's'
   */
  size?: 's' | 'l';
  /**
   * Callback when card is pressed
   * */
  onPress?: NoopFn;
} & SharedProps;
