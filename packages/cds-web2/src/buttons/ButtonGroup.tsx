import React, { Children, cloneElement, memo } from 'react';
import { css, cx } from '@linaria/core';
import type { ButtonGroupBaseProps } from '@cbhq/cds-common2/types/ButtonBaseProps';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';

export type ButtonGroupProps = ButtonGroupBaseProps & SharedProps;

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
  const Stack = isVertical ? VStack : HStack;

  return (
    <Stack
      alignItems="stretch"
      aria-label={accessibilityLabel}
      as="ul"
      className={listStyle}
      data-testid={testID}
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
    </Stack>
  );
});
