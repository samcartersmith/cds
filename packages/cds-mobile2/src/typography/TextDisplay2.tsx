import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextDisplay2 = memo(
  forwardRef<NativeText, TextProps>(
    ({ accessibilityRole = 'header', font = 'display2', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
