import React from 'react';

import { IconButtonProps, IconButton } from '../buttons/IconButton';

type NavigationIconButtonProps = {
  label: string;
} & IconButtonProps;

export const NavigationIconButton = ({ label, ...props }: NavigationIconButtonProps) => {
  return <IconButton accessibilityLabel={label} {...props} />;
};
