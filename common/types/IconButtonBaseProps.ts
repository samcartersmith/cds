import { ButtonBaseProps } from './ButtonBaseProps';
import { IconName } from './IconName';
import { SpacingProps, OffsetProps } from './SpacingProps';

export type IconButtonVariant = 'primary' | 'secondary';

export interface IconButtonBaseProps
  extends Omit<ButtonBaseProps, 'variant' | 'name' | 'children' | 'loading' | 'accessibilityLabel'>,
    SpacingProps,
    OffsetProps {
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /**
   * An accessibility hint helps users understand what will happen
   * when they perform an action on the accessibility element
   * when that result is not obvious from the accessibility label.
   */
  accessibilityHint?: string;
  /** Name of Icon. */
  name: IconName;
  /** Number to show on top right corner of button. */
  badge?: number;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}
