import React, { memo } from 'react';

import { CardGroupBaseProps, useBeta } from '@cbhq/cds-common';
import { css } from 'linaria';

import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Card } from './Card';

const list = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const listItem = css`
  list-style: none;
  flex: 1;
`;

export const CardGroup = memo(function CardGroup({
  accessibilityLabel,
  children,
  testID,
  horizontal,
  ...otherBoxProps
}: CardGroupBaseProps) {
  const { frontierCard } = useBeta();
  const Stack = horizontal ? HStack : VStack;

  return (
    <Stack
      aria-label={accessibilityLabel}
      role="group"
      as="ul"
      alignItems="stretch"
      flexWrap="nowrap"
      gap={frontierCard ? 0 : 1}
      testID={testID}
      dangerouslySetClassName={list}
      {...otherBoxProps}
    >
      {flattenNodes(children)
        .filter((child) => child && typeof child === 'object' && child.type === Card)
        .map((child) => {
          return <li className={listItem}>{child}</li>;
        })}
    </Stack>
  );
});
