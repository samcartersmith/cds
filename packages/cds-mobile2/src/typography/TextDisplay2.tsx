import React from 'react';

import { type TextProps, Text } from './Text';

export const TextDisplay2 = (props: TextProps) => (
  <Text accessibilityRole="header" font="display2" {...props} />
);
