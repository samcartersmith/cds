import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { type TextProps, Text } from './Text';

export const TextDisplay3 = memo(
  forwardRef<NativeText, TextProps>((props, ref) => (
    <Text ref={ref} accessibilityRole="header" font="display3" {...props} />
  )),
);
