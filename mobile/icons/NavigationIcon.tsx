import React, { FunctionComponent, memo } from 'react';

import { NavigationIconName, IconSize, NavigationIconInternalName } from '@cbhq/cds-common';

import { IconBase, IconBaseMobileProps } from './IconBase';

interface NavigationIconProps
  extends Omit<
    IconBaseMobileProps,
    'name' | 'size' | 'bordered' | 'dangerouslySetColor' | 'color' | 'dangerouslySetStyle'
  > {
  /** Navigation icon names */
  name: NavigationIconName;
  /**
   * Size of navigation Icon
   * @default l
   * */
  size?: Exclude<IconSize, 'xs'>;
  /**
   * Toggles the active and inactive state of the navigation icon
   * @default false
   **/
  active?: boolean;
}

export const NavigationIcon: FunctionComponent<NavigationIconProps> = memo(function NavigationIcon({
  name,
  size = 'm',
  active = false,
  ...props
}: NavigationIconProps) {
  const navigationIconName = (active
    ? `${name}Active`
    : `${name}Inactive`) as NavigationIconInternalName;
  return (
    <IconBase
      color={active ? 'primary' : 'foreground'}
      size={size}
      name={navigationIconName}
      {...props}
    />
  );
});
