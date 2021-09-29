import { InputVariant } from '@cbhq/cds-common';
import React, { memo } from 'react';
import { TextLabel2, TextProps } from '../typography';

type HelperTextProps = {
  /** Color of helper text */
  color?: InputVariant;
} & TextProps;

export const HelperText = memo(({ ...props }: HelperTextProps) => <TextLabel2 as="p" {...props} />);
