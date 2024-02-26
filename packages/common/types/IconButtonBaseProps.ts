import { ButtonBaseProps } from './ButtonBaseProps';
import { IconName } from './IconName';
import { SharedProps } from './SharedProps';

export type IconButtonVariant = 'primary' | 'secondary' | 'foregroundMuted';
export type IconButtonBaseProps = {
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
} & Pick<ButtonBaseProps, 'accessibilityLabel' | 'disabled' | 'transparent'> &
  SharedProps;
