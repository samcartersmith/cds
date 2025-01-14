import React from 'react';

import { type TextProps, Text } from './Text';

export const TextDisplay3 = (props: TextProps) => (
  <Text accessibilityRole="header" font="display3" {...props} />
);
