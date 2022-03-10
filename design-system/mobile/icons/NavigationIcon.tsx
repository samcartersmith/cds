import React, { FunctionComponent, memo } from 'react';

import { NavigationIconInternalName } from '@cbhq/cds-common';
import { NavigationBaseIconProps } from '@cbhq/cds-common/types/NavigationBaseIconProps';

import { IconBase, IconBaseMobileProps } from './IconBase';

export type NavigationIconProps = NavigationBaseIconProps &
  Omit<
    IconBaseMobileProps,
    'name' | 'size' | 'bordered' | 'dangerouslySetColor' | 'color' | 'dangerouslySetStyle'
  >;

export const NavigationIcon: FunctionComponent<NavigationIconProps> = memo(function NavigationIcon({
  name,
  size = 'm',
  active = false,
  ...props
}: NavigationIconProps) {
  const navigationIconName: NavigationIconInternalName = active
    ? `${name}Active`
    : `${name}Inactive`;

  return (
    <IconBase
      color={active ? 'primary' : 'foreground'}
      size={size}
      name={navigationIconName}
      {...props}
    />
  );
});
