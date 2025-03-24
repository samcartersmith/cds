import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextCaption = memo(
  forwardRef<NativeText, TextProps>(({ font = 'caption', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
