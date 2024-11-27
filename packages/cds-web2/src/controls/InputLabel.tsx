import React, { memo } from 'react';

import { TextProps } from '../text/Text';
import { TextLabel1 } from '../text/TextLabel1';

export type InputLabelProps = TextProps<'label'>;

export const InputLabel = memo(function InputLabel({
  color = 'textForeground',
  disabled = false,
  ...props
}: InputLabelProps) {
  return <TextLabel1 as="label" color={color} disabled={disabled} paddingY={0.5} {...props} />;
});
