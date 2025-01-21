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

export type DividerProps = DividerBaseProps & Omit<BoxProps<'hr'>, 'as' | 'role'>;

const directionStyles: {
  [key in NonNullable<DividerBaseProps['direction']>]: string;
} = {
  horizontal: css`
    height: 1px;
  `,
  vertical: css`
    width: 1px;
  `,
} as const;

export const Divider = memo(
  ({ color, direction = 'horizontal', background = 'line', ...props }: DividerProps) => {
    return (
      <Box
        alignSelf="stretch"
        aria-orientation={direction}
        as="hr"
        background={color ?? background}
        className={cx(directionStyles[direction])}
        margin={0}
        role="separator"
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';
