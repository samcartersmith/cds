import React, { memo } from 'react';

import { TextLabel1 } from '../typography';

import { HelperTextProps } from './HelperText';

export const InputLabel = memo(function InputLabel({ color, ...props }: HelperTextProps) {
  return <TextLabel1 color={color} paddingY={0.5} {...props} />;
});
