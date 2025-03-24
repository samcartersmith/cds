import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextTitle4 = memo(
  forwardRef<NativeText, TextProps>(({ font = 'title4', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
