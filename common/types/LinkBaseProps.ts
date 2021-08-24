import { PaletteForeground } from './Palette';
import { Typography } from './Typography';

export type LinkTypography = Exclude<Typography, 'display1' | 'display2'> | 'inherit';

export type LinkBaseProps = {
  /** URL that this link goes to when pressed. */
  to?: string;
  /** Color of the foreground text. */
  color?: PaletteForeground;
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Children to render within the link. */
  children: NonNullable<React.ReactNode>;
  /**
   * Specify typography of the text
   * @default inherit
   */
  variant?: LinkTypography;
};
