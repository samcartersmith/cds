import React, { Children, cloneElement, memo } from 'react';
import { css, cx } from '@linaria/core';
import type {
  ElementChildren,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common2/types';

import { Box, type GroupDirection } from '../layout';

import type { ButtonBaseProps } from './Button';

export type ButtonGroupBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Expand buttons to fill available space within the group. */
    block?: boolean;
    /** Buttons to render as a group. */
    children: ElementChildren<ButtonBaseProps>;
    /**
     * @default horizontal
     * Stack buttons vertically or horizontally.
     */
    direction?: GroupDirection;
  };

export type ButtonGroupProps = ButtonGroupBaseProps;

const listStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const itemStyle = css`
  list-style: none;
`;

const fillStyle = css`
  flex: 1;
`;

export const ButtonGroup = memo(function ButtonGroup({
  accessibilityLabel,
  block,
  children,
  testID,
  direction,
}: ButtonGroupProps) {
  const isVertical = direction === 'vertical';

  return (
    <Box
      alignItems="stretch"
      aria-label={accessibilityLabel}
      as="ul"
      className={listStyle}
      data-testid={testID}
      flexDirection={isVertical ? 'column' : 'row'}
      flexWrap="nowrap"
      gap={1}
    >
      {Children.map(children, (child) =>
        child ? (
          <li className={cx(itemStyle, block && fillStyle)}>
            {cloneElement(child, {
              block: block || isVertical,
            })}
          </li>
        ) : null,
      )}
    </Box>
  );
});
