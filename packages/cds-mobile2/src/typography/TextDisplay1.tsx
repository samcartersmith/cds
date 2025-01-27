import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextDisplay1 = memo((props: TextProps) => (
  <Text accessibilityRole="header" font="display1" {...props} />
));
