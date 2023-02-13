import React from 'react';

import { IconButton, IconButtonProps } from '../../buttons/IconButton';

type NavigationIconButtonProps = {
  label: string;
} & IconButtonProps;

/** @deprecated */
export const NavigationIconButton = ({ label, ...props }: NavigationIconButtonProps) => {
  return <IconButton accessibilityLabel={label} {...props} />;
};
