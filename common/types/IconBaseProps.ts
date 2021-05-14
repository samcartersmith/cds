import type { IconName, NavigationIconInternalName } from './IconName';
import type { IconSize } from './IconSize';
import type { SpacingProps } from './SpacingProps';

export interface IconBaseProps extends SpacingProps {
  /** Size for a given icon. */
  size: IconSize;
  /** Name of the icon, as defined in Figma. */
  name: IconName | NavigationIconInternalName;
  /**
   * A boolean flag indicating whether or not a border should be shown around an icon.
   * This border will match color prop. Border is only allowed for sizes m and above.
   * @default false
   */
  bordered?: boolean;
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetColor?: string;
}
