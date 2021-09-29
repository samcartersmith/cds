import React, { memo } from 'react';

import { TextLabel1 } from '../typography/TextLabel1';
import { TextProps } from '../typography/TextProps';

export const InputLabel = memo(({ color = 'foreground', ...props }: TextProps) => (
  <TextLabel1 as="p" color={color} {...props} />
));
