import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextInherited = memo(
  forwardRef<NativeText, TextProps>(({ font = 'inherit', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
