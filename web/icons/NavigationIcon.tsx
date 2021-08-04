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

export type NavigationIconProps = {
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
} & Omit<IconBaseWebProps, 'color'> &
  SpacingProps &
  SharedProps;

export const NavigationIcon = memo(
  ({ name, size = 'm', active = false, ...props }: NavigationIconProps) => {
    const navigationIconName: NavigationIconInternalName = active
      ? `${name}Active`
      : `${name}Inactive`;

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
