import { NavigationIconName } from './IconName';
import { IconSize } from './IconSize';

export type NavigationBaseIconProps = {
  /** Navigation icon names */
  name: NavigationIconName;
  /**
   * Size of navigation Icon
   * @default l
   */
  size?: Exclude<IconSize, 'xs'>;
  /**
   * Toggles the active and inactive state of the navigation icon
   * @default false
   */
  active?: boolean;
};
