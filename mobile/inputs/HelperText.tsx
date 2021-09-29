import React, { memo } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { TextLabel2, TextProps } from '../typography';

export type InputTextProps = {
  /**
   * Determines the color of the text
   * @default foregroundMuted
   */
  color?: InputVariant;
} & TextProps;

export const HelperText = memo(function HelperText({ color, ...props }: InputTextProps) {
  return <TextLabel2 color={color} {...props} />;
});
