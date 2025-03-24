import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextTitle1 = memo(
  forwardRef<NativeText, TextProps>(
    ({ accessibilityRole = 'header', font = 'title1', ...props }, ref) => (
      <Text ref={ref} accessibilityRole={accessibilityRole} font={font} {...props} />
    ),
  ),
);
