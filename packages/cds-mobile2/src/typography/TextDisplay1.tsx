import React from 'react';

import { type TextProps, Text } from './Text';

export const TextDisplay1 = (props: TextProps) => (
  <Text accessibilityRole="header" font="display1" {...props} />
);
