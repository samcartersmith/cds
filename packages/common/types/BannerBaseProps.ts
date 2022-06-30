import React, { ReactNode } from 'react';

import { BorderRadiusAlpha } from './BorderRadius';
import { IconName } from './IconName';
import { SharedProps } from './SharedProps';

export type BannerTone = 'severe' | 'warning' | 'promotional' | 'informational';

export type BannerBaseProps = {
  /** Sets the tone of the banner */
  tone: BannerTone;
  /** Name of icon to be shown in the banner */
  startIcon: IconName;
  /** A callback fired when banner is dismissed */
  onClose?: () => void;
  /** Provide a CDS Link component. It will inherit colors depending on the provided tone */
  action?: React.ReactNode;
  /** Title of banner. Indicates the intent of this banner */
  title: string;
  /** Message of banner */
  children: NonNullable<ReactNode>;
  /**
   * Determines whether banner can be dismissed or not
   * @default true
   * */
  showDismiss?: boolean;
  /**
   * Determines whether banner has a border or not
   * @default true
   * */
  bordered?: boolean;
  /**
   * Determines banner's border radius
   * @default 'rounded'
   * */
  borderRadius?: BorderRadiusAlpha;
  /** Indicates the max number of lines after which body text will be truncated */
  numberOfLines?: number;
} & SharedProps;
