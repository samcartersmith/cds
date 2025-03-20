import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { Text, type TextProps } from './Text';

export const TextLegal = memo(
  forwardRef<NativeText, TextProps>((props, ref) => <Text ref={ref} font="legal" {...props} />),
);
