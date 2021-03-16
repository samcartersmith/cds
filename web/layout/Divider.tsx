import React from 'react';

import { DividerBaseProps } from '@cbhq/cds-common';
import { css, cx } from 'linaria';
import { useSeparator } from 'react-aria';

import { palette } from '../tokens';
import { Box, BoxProps } from './Box';

export interface DividerProps extends DividerBaseProps, BoxProps {}

const styles = {
  line: css`
    background-color: ${palette.line};
  `,
  lineHeavy: css`
    background-color: ${palette.lineHeavy};
  `,
  horizontal: css`
    width: 100%;
    height: 1px;
  `,
  vertical: css`
    height: 100%;
    width: 1px;
  `,
};

export const Divider = ({
  color = 'line',
  direction = 'horizontal',
  ...boxProps
}: DividerProps) => {
  const { separatorProps } = useSeparator({ elementType: 'div' });

  return (
    <Box
      height={direction === 'vertical' ? '100%' : undefined}
      width={direction === 'horizontal' ? '100%' : undefined}
      {...boxProps}
    >
      <div {...separatorProps} className={cx(styles[direction], styles[color])} />
    </Box>
  );
};
