import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextDisplay3 = memo(
  forwardRef<NativeText, TextProps>((props, ref) => (
    <Text ref={ref} accessibilityRole="header" font="display3" {...props} />
  )),
);
