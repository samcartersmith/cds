import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextCaption = memo((props: TextProps) => (
  <Text font="caption" textTransform="uppercase" {...props} />
));
