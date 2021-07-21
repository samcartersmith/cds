import React, { Children, cloneElement, memo } from 'react';

import { ButtonGroupBaseProps, SharedProps } from '@cbhq/cds-common';
import { css, cx } from 'linaria';

import { HStack, VStack } from '../layout';

export interface ButtonGroupProps extends ButtonGroupBaseProps, SharedProps {}

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
  vertical,
}: ButtonGroupProps) {
  const Stack = vertical ? VStack : HStack;

  return (
    <Stack
      aria-label={accessibilityLabel}
      role="group"
      as="ul"
      alignItems="stretch"
      flexWrap="nowrap"
      gap={2}
      testID={testID}
      dangerouslySetClassName={list}
    >
      {Children.map(children, child =>
        child ? (
          <li className={cx(item, block && fill)}>
            {cloneElement(child, { block: block || vertical })}
          </li>
        ) : null,
      )}
    </Stack>
  );
});
