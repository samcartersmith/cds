import type { NavigationIconName } from './IconName';
import type { IconSize } from './IconSize';
import { SharedProps } from './SharedProps';
import { SpacingProps } from './SpacingProps';

export type NavigationIconSize = 's' | 'm' | 'l';

export type NavigationBaseIconProps = {
  /** Size for a given icon.
   * @default m
   */
  size?: IconSize;
  /** Name of the icon, as defined in Figma. */
  name: NavigationIconName;
  /**
   * A boolean flag indicating whether or not a border should be shown around an icon.
   * This border will match color prop. Border is only allowed for sizes m and above.
   * @default false
   */
  bordered?: boolean;
  /**
   * Fallback element to render if unable to find an icon with matching name
   * @default null
   * */
  fallback?: null | React.ReactElement;
  /**
   * Toggles the active and inactive state of the navigation icon
   * @default false
   */
  active?: boolean;
} & SpacingProps &
  SharedProps;
