import React, { memo } from 'react';

import {
  NavigationIconInternalName,
  NavigationIconName,
  IconSize,
  SharedProps,
  SpacingProps,
} from '@cbhq/cds-common';

import type { IconBaseWebProps } from './IconBase';
import { IconBase } from './IconBase';

export interface NavigationIconProps
  extends Omit<IconBaseWebProps, 'color'>,
    SpacingProps,
    SharedProps {
  /** Name of navigation icon, as defined by Figma */
  name: NavigationIconName;
  /**
   * Size of navigation Icon
   * @default m
   */
  size?: Exclude<IconSize, 'xs'>;
  /**
   * Toggles the active and inactive state of the navigation icon
   * @default false
   */
  active?: boolean;
}

export const NavigationIcon = memo(
  ({ name, size = 'm', active = false, ...props }: NavigationIconProps) => {
    const navigationIconName = (
      active ? `${name}Active` : `${name}Inactive`
    ) as NavigationIconInternalName;
    return (
      <IconBase
        size={size}
        name={navigationIconName}
        color={active ? 'primary' : 'foreground'}
        {...props}
      />
    );
  },
);

NavigationIcon.displayName = 'NavigationIcon';
