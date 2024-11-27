import React, { Children, cloneElement, memo } from 'react';
import { css } from '@linaria/core';
import { ButtonGroupBaseProps, SharedProps } from '@cbhq/cds-common';

import { HStack, VStack } from '../layout';
import { cx } from '../utils/linaria';

export type ButtonGroupProps = ButtonGroupBaseProps & SharedProps;

const list = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const item = css`
  list-style: none;
`;

const fill = css`
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
      className={list}
      flexWrap="nowrap"
      gap={1}
      testID={testID}
    >
      {Children.map(children, (child) =>
        child ? (
          <li className={cx(item, block && fill)}>
            {cloneElement(child, {
              block: block || isVertical,
            })}
          </li>
        ) : null,
      )}
    </Stack>
  );
});
