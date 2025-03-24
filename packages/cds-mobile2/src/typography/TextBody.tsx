import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextBody = memo(
  forwardRef<NativeText, TextProps>(({ font = 'body', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
