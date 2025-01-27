import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextDisplay2 = memo((props: TextProps) => (
  <Text accessibilityRole="header" font="display2" {...props} />
));
