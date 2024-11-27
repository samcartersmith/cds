import React, { memo } from 'react';
import { css } from '@linaria/core';

import { TextLabel1 } from '../typography/TextLabel1';
import { TextProps } from '../typography/TextProps';

type NativeLabelProps = Omit<JSX.IntrinsicElements['label'], 'style' | 'className'>;
export type InputLabelProps = TextProps & NativeLabelProps;

const labelStyle = css`
  && {
    display: block;
  }
`;

export const InputLabel = memo(function InputLabel({
  color = 'foreground',
  disabled = false,
  ...props
}: InputLabelProps) {
  return (
    <TextLabel1
      as="label"
      className={labelStyle}
      color={color}
      disabled={disabled}
      spacingVertical={0.5}
      {...props}
    />
  );
});
