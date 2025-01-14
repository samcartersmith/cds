import React from 'react';

import { type TextProps, Text } from './Text';

export const TextTitle1 = (props: TextProps) => (
  <Text accessibilityRole="header" font="title1" {...props} />
);
