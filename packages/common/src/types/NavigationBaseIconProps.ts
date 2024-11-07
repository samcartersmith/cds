import type { NavigationIconName } from './IconName';
import { SharedProps } from './SharedProps';
import { SpacingProps } from './SpacingProps';

export type NavigationIconSize = 's' | 'm' | 'l';

export type NavigationBaseIconProps = {
  /** Navigation icon names */
  name: NavigationIconName;
  /**
   * Size of navigation Icon
   * @default m
   */
  size?: NavigationIconSize;
  /**
   * Toggles the active and inactive state of the navigation icon
   * @default false
   */
  active?: boolean;
  /**
   * Fallback element to render if unable to find an icon with matching name
   * @default null
   * */
  fallback?: null | React.ReactElement;
} & SpacingProps &
  SharedProps;
