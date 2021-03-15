import React from 'react';

import { PaletteBorder } from '@cbhq/cds-common';
import { css, cx } from 'linaria';
import { useSeparator } from 'react-aria';

import { palette } from '../tokens';
import { Box, BoxProps } from './Box';

export interface DividerProps extends BoxProps {
  color?: Extract<PaletteBorder, 'line' | 'lineHeavy'>;
}

const styles = {
  line: css`
    background-color: ${palette.line};
  `,
  lineHeavy: css`
    background-color: ${palette.lineHeavy};
  `,
  shared: css`
    width: 100%;
    height: 1px;
  `,
};

export const Divider = ({ color = 'line', ...boxProps }: DividerProps) => {
  const { separatorProps } = useSeparator({ elementType: 'div' });
  return (
    <Box {...boxProps}>
      <div {...separatorProps} className={cx(styles.shared, styles[color])} />
    </Box>
  );
};
