import React, { memo } from 'react';
import { css } from 'linaria';

import { TextLabel1 } from '../typography/TextLabel1';
import { TextProps } from '../typography/TextProps';

const labelStyle = css`
  && {
    display: block;
  }
`;

export const InputLabel = memo(
  ({ color = 'foreground', disabled = false, ...props }: TextProps & { for?: string }) => (
    <TextLabel1
      dangerouslySetClassName={labelStyle}
      spacingVertical={0.5}
      as="label"
      disabled={disabled}
      color={color}
      {...props}
    />
  ),
);
