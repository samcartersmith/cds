import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextTitle2 = memo(
  forwardRef<NativeText, TextProps>(
    ({ accessibilityRole = 'header', font = 'title2', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
