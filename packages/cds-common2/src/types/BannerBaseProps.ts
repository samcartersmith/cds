import React from 'react';

import { ThemeVars } from '../core/theme';

import { IconName } from './IconName';
import { SharedProps } from './SharedProps';

export type BannerVariant = 'danger' | 'warning' | 'promotional' | 'informational' | 'error';

export type BannerStyleVariant = 'inline' | 'global' | 'contextual';

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
  title?: React.ReactNode;
  /** Message of banner */
  children?: React.ReactNode;
  /**
   * Determines whether banner can be dismissed or not. Banner is not dismisable when styleVariant is set to global.
   * @default true
   * */
  showDismiss?: boolean;
  /** Indicates the max number of lines after which body text will be truncated */
  numberOfLines?: number;
  /** Use for supplemental data */
  label?: React.ReactNode;
  /**
   * Determines the banner style and indicates the suggested positioning for the banner
   * @default 'contextual'
   * */
  styleVariant?: BannerStyleVariant;
  /** Accessibility label for start icon on the banner */
  startIconAccessibilityLabel?: string;
  /** Accessibility label for close button on the banner */
  closeAccessibilityLabel?: string;
  /**
   * Determines whether banner has a border or not
   * @default true
   * */
  bordered?: boolean;
  /**
   * Determines banner's border radius
   * @default 400
   * */
  borderRadius?: ThemeVars.BorderRadius;
} & SharedProps;
