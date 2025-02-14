import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { type TextProps, Text } from './Text';

export const TextCaption = memo(
  forwardRef<NativeText, TextProps>((props, ref) => <Text ref={ref} font="caption" {...props} />),
);
