import React, { forwardRef, memo } from 'react';
import { Text as NativeText } from 'react-native';

import { type TextProps, Text } from './Text';

export const TextInherited = memo(
  forwardRef<NativeText, TextProps>((props, ref) => (
    <Text ref={ref} inherit font="body" {...props} />
  )),
);
