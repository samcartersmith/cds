import React from 'react';

import { type TextProps, Text } from './Text';

export const TextTitle2 = (props: TextProps) => (
  <Text accessibilityRole="header" font="title2" {...props} />
);
