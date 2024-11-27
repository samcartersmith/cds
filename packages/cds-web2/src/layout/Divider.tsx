import React, { memo } from 'react';
import { css, cx } from '@linaria/core';

import { Box, PolymorphicBoxProps } from './Box';

export type DividerBaseProps = {
  /**
   * The direction to render the divider line.
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
};

export type DividerProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  DividerBaseProps
>;

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
  <AsComponent extends React.ElementType = 'div'>({
    color,
    direction = 'horizontal',
    background = 'line',
    ...props
  }: DividerProps<AsComponent>) => {
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
