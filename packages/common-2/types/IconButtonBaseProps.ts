import { ButtonBaseProps } from './ButtonBaseProps';
import { IconName } from './IconName';

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
} & Pick<ButtonBaseProps, 'accessibilityLabel' | 'disabled' | 'transparent'>;
