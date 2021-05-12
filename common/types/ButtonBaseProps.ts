import { IconName } from './IconName';
import { ElementChildren } from './React';

export type ButtonVariant = 'primary' | 'secondary' | 'positive' | 'negative';

export interface ButtonBaseProps {
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Children to render within the button. */
  children: NonNullable<React.ReactNode>;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
}

export interface ButtonGroupBaseProps {
  /** Accessibility label describing the group of buttons. */
  accessibilityLabel: string;
  /** Expand buttons to fill available space within the group. */
  block?: boolean;
  /** Buttons to render as a group. */
  children: ElementChildren<ButtonBaseProps>;
  /** Stack buttons vertically instead of horizontally. */
  vertical?: boolean;
}
