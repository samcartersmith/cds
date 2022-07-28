import React, { memo } from 'react';
import {
  NavigationIconInternalName,
  SharedAccessibilityProps,
  SharedProps,
  SpacingProps,
} from '@cbhq/cds-common';
import { NavigationBaseIconProps } from '@cbhq/cds-common/types/NavigationBaseIconProps';

import type { IconBaseWebProps } from './IconBase';
import { IconBase } from './IconBase';

export type NavigationIconProps = NavigationBaseIconProps &
  Omit<IconBaseWebProps, 'color'> &
  SpacingProps &
  SharedProps &
  SharedAccessibilityProps;

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
