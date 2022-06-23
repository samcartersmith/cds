import React from 'react';
import { css } from 'linaria';
import { Separator } from 'reakit';
import { DividerBaseProps } from '@cbhq/cds-common';

import { palette } from '../tokens';
import { cx } from '../utils/linaria';

import { Box, BoxProps } from './Box';

export type DividerProps = DividerBaseProps & Omit<BoxProps, 'as' | 'role'>;

const styles = {
  line: css`
    background-color: ${palette.line};
  `,
  lineHeavy: css`
    background-color: ${palette.lineHeavy};
  `,
  horizontal: css`
    flex-grow: 1;
    height: 1px;
  `,
  vertical: css`
    flex-grow: 1;
    width: 1px;
  `,
};

export const Divider = ({
  color = 'line',
  direction = 'horizontal',
  ...boxProps
}: DividerProps) => {
  return (
    <Box alignSelf="stretch" alignItems="stretch" {...boxProps}>
      <Separator
        as="div"
        orientation={direction}
        className={cx(styles[direction], styles[color])}
      />
    </Box>
  );
};
