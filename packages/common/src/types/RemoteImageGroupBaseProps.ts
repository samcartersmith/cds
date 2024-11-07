import React from 'react';

import { AvatarSize } from './AvatarSize';
import { Shape } from './Shape';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';

export type RemoteImageGroupBaseProps = {
  /** Children content */
  children?: React.ReactNode | React.ReactNode[];
} & RemoteImageGroupExcessBaseProps &
  SharedProps &
  SharedAccessibilityProps;

export type RemoteImageGroupExcessBaseProps = {
  /**
   * Indicates the number of remote image before it collapses
   * @default 4
   */
  max?: number;
  /**
   * Size of all RemoteImage children in the group.
   * @default m
   */
  size?: AvatarSize | number;
  /**
   * Shape of all RemoteImage children in the group
   * @default circle
   */
  shape?: Shape;
};
