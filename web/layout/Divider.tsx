import React from 'react';

import { PaletteBorder, PinningDirection, OffsetProps } from '@cbhq/cds-common';
import { css, cx } from 'linaria';
import { useSeparator } from 'react-aria';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { usePinStyles } from '../hooks/usePinStyles';
import { palette } from '../tokens';

export interface DividerProps extends OffsetProps {
  color?: Extract<PaletteBorder, 'line' | 'lineHeavy'>;
  pin?: PinningDirection;
  width?: number | string;
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

export const Divider = ({ color = 'line', pin, width, ...offsetProps }: DividerProps) => {
  const { separatorProps } = useSeparator({ elementType: 'div' });
  const pinStyles = usePinStyles(pin);
  const offsetStyles = useOffsetStyles(offsetProps);
  const style = { width };

  return React.createElement('div', {
    ...separatorProps,
    className: cx(styles.shared, styles[color], pinStyles, offsetStyles),
    style,
  });
};
