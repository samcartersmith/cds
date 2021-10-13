import React, { memo } from 'react';

import { TextLabel1 } from '../typography/TextLabel1';
import { TextProps } from '../typography/TextProps';

export const InputLabel = memo(
  ({ color = 'foreground', disabled = false, ...props }: TextProps) => (
    <TextLabel1 spacingVertical={0.5} as="p" disabled={disabled} color={color} {...props} />
  ),
);
