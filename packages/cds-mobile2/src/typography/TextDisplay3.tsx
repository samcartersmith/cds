import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextDisplay3 = memo((props: TextProps) => (
  <Text accessibilityRole="header" font="display3" {...props} />
));
