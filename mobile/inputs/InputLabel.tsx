import React, { memo } from 'react';
import { TextLabel1 } from '../typography';
import { InputTextProps } from './HelperText';

export const InputLabel = memo(function InputLabel({ color, ...props }: InputTextProps) {
  return <TextLabel1 spacingVertical={0.5} color={color} {...props} />;
});
