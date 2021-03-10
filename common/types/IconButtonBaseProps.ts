import { ButtonBaseProps } from './ButtonBaseProps';
import { IconName } from './IconName';
import { SpacingProps, OffsetProps } from './SpacingProps';

export type IconButtonVariant = 'primary' | 'secondary';

export interface IconButtonBaseProps
  extends Omit<ButtonBaseProps, 'variant' | 'name' | 'children' | 'loading'>,
    SpacingProps,
    OffsetProps {
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /** Number to show on top right corner of button. */
  badge?: number;
  /** @internal Testing purposes. */
  testID?: string;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}
