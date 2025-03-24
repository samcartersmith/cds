import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextHeadline = memo(
  forwardRef<NativeText, TextProps>(({ font = 'headline', ...props }, ref) => (
    <Text ref={ref} font={font} {...props} />
  )),
);
