import React from 'react';

import { ThemeVars } from '../new/vars';

import { IconName } from './IconName';
import { SharedProps } from './SharedProps';

export type BannerVariant = 'danger' | 'warning' | 'promotional' | 'informational' | 'error';

export type BannerBaseProps = {
  /** Sets the variant of the banner - which is responsible for foreground and background color assignment */
  variant: BannerVariant;
  /** Name of icon to be shown in the banner */
  startIcon: IconName;
  /** A callback fired when banner is dismissed */
  onClose?: () => void;
  /** Provide a CDS Link component to be used as a primary action. It will inherit colors depending on the provided variant */
  primaryAction?: React.ReactNode;
  /** Provide a CDS Link component to be used as a secondary action. It will inherit colors depending on the provided tone */
  secondaryAction?: React.ReactNode;
  /** Title of banner. Indicates the intent of this banner */
  title: string;
  /** Message of banner */
  children: NonNullable<React.ReactNode>;
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
  borderRadius?: ThemeVars.BorderRadius;
  /** Indicates the max number of lines after which body text will be truncated */
  numberOfLines?: number;
} & SharedProps;
