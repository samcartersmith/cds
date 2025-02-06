import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { type TextProps, Text } from './Text';

export const TextDisplay2 = memo(
  forwardRef<NativeText, TextProps>((props, ref) => (
    <Text ref={ref} accessibilityRole="header" font="display2" {...props} />
  )),
);
