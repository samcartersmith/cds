import { PaletteForeground } from '../types';

export interface LinkBaseProps {
  /** URL that this link goes to when pressed. */
  to?: string;
  /** Color of the foreground text. */
  color?: PaletteForeground;
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Children to render within the link. */
  children: NonNullable<React.ReactNode>;
  /**
   * Testing purposes.
   * @internal
   **/
  testID?: string;
}
