import { ButtonBaseProps } from './ButtonBaseProps';
import { IconName } from './IconName';

export type IconButtonVariant = 'primary' | 'secondary' | 'foregroundMuted';
export interface IconButtonBaseProps
  extends Pick<ButtonBaseProps, 'accessibilityLabel' | 'disabled' | 'transparent'> {
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}
