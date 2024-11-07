import { PaletteForeground } from './Palette';
import { Typography } from './Typography';

export type LinkTypography = Exclude<Typography, 'display1' | 'display2' | 'display3'> | 'inherit';

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
  /** Use CoinbaseMono font */
  mono?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false (unless nested inside a paragraph tag)
   */
  underline?: boolean;
};
