import React, { memo } from 'react';
import { css, cx } from '@linaria/core';

import { type BoxProps, Box } from './Box';

export type DividerBaseProps = {
  /**
   * The direction to render the divider line.
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
};

export type DividerProps = DividerBaseProps & Omit<BoxProps<'div'>, 'as' | 'role'>;

const directionStyles: {
  [key in NonNullable<DividerBaseProps['direction']>]: string;
} = {
  horizontal: css`
    flex-grow: 1;
    height: 1px;
    display: block;
  `,
  vertical: css`
    flex-grow: 1;
    width: 1px;
  `,
} as const;

export const Divider = memo(
  ({ color, direction = 'horizontal', background = 'line', ...props }: DividerProps) => {
    return (
      <Box
        aria-orientation={direction}
        background={color ?? background}
        className={cx(directionStyles[direction])}
        role="separator"
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';
