import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextLabel1 = memo(
  forwardRef<NativeText, TextProps>((props, ref) => <Text ref={ref} font="label1" {...props} />),
);
