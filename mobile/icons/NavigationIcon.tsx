import React, { FunctionComponent } from 'react';

import {
  NavigationIconName,
  IconSize,
  SharedProps,
  NavigationIconInternalName,
  IconBaseProps,
} from '@cbhq/cds-common';

import { IconBase } from './IconBase';

interface NavigationIconProps
  extends Omit<IconBaseProps, 'name' | 'size' | 'bordered' | 'dangerouslySetColor'>,
    SharedProps {
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
  active: boolean;
}

export const NavigationIcon: FunctionComponent<NavigationIconProps> = ({
  name,
  size = 'l',
  active = false,
  ...props
}: NavigationIconProps) => {
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
};
