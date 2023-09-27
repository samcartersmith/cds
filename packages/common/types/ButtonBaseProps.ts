import { GroupDirection } from './GroupBaseProps';
import { IconName } from './IconName';
import { ElementChildren } from './React';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';

export type ButtonVariant = 'primary' | 'secondary' | 'positive' | 'negative' | 'foregroundMuted';

export type ButtonBaseProps = {
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
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
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
  variant?: Exclude<ButtonVariant, 'foregroundMuted'>;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   */
  numberOfLines?: number;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

export type ButtonGroupBaseProps = {
  /** Expand buttons to fill available space within the group. */
  block?: boolean;
  /** Buttons to render as a group. */
  children: ElementChildren<ButtonBaseProps>;
  /** @deprecated Q4 2023 Use direction='vertical' instead */
  vertical?: boolean;
  /**
   * @default horizontal
   * Stack buttons vertically or horizontally.
   */
  direction?: GroupDirection;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'>;
