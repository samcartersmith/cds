import React, { memo } from 'react';

import { type TextProps, Text } from './Text';

export const TextTitle2 = memo((props: TextProps) => (
  <Text accessibilityRole="header" font="title2" {...props} />
));
