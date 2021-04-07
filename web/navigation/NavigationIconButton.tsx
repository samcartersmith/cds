import React from 'react';

import { IconButtonProps, IconButton } from '../buttons/IconButton';

interface NavigationIconButtonProps extends IconButtonProps {
  label: string;
}

export const NavigationIconButton = ({ label, ...props }: NavigationIconButtonProps) => {
  return <IconButton accessibilityLabel={label} {...props} />;
};
