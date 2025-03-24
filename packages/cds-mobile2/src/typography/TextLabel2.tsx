import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextLabel2 = memo(
  forwardRef<NativeText, TextProps>(({ font = 'label2', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
