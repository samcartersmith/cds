import React from 'react';

import { type TextProps, Text } from './Text';

export const TextCaption = (props: TextProps) => (
  <Text font="caption" textTransform="uppercase" {...props} />
);
