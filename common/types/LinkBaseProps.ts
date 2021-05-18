import { PaletteForeground } from '../types';
import { Typography } from './Typography';

export type LinkTypography = Exclude<Typography, 'display1' | 'display2'>;

export interface LinkBaseProps {
  /** URL that this link goes to when pressed. */
  to?: string;
  /** Color of the foreground text. */
  color?: PaletteForeground;
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Children to render within the link. */
  children: NonNullable<React.ReactNode>;
  /** Specify inner text type */
  variant?: LinkTypography;
}
