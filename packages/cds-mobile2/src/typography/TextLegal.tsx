import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextLegal = memo(
  forwardRef<NativeText, TextProps>(({ font = 'legal', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
