import React from 'react';

import { PaletteForeground } from '@cbhq/cds-common';

import { IconBase } from './IconBase';
import { IconProps } from './IconProps';

export type { IconProps };

export const Icon = ({
  badge,
  bordered = false,
  color = 'primary' as PaletteForeground,
  size,
  name,
  ...props
}: IconProps) => {
  return (
    <IconBase name={name} color={color} size={size} bordered={bordered} badge={badge} {...props} />
  );
};
