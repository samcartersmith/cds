import React, { memo, useMemo } from 'react';

import { CardGroupBaseProps } from '@cbhq/cds-common';
import { join } from '@cbhq/cds-common/utils/join';
import { css } from 'linaria';

import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { Divider } from '../layout/Divider';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Card } from './Card';
import { useFeatureFlag } from '../system/useFeatureFlag';

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
  const isFrontier = useFeatureFlag('frontierCard');
  const Stack = horizontal ? HStack : VStack;

  const cards = useMemo(() => {
    const nodes = flattenNodes(children)
      .filter((child) => child && typeof child === 'object' && child.type === Card)
      .map((child) => {
        return <li className={listItem}>{child}</li>;
      });

    if (isFrontier) {
      return join(nodes, <Divider />);
    }
    return nodes;
  }, [children, isFrontier]);

  return (
    <Stack
      aria-label={accessibilityLabel}
      role="group"
      as="ul"
      alignItems="stretch"
      flexWrap="nowrap"
      gap={isFrontier ? 0 : 1}
      testID={testID}
      dangerouslySetClassName={list}
      {...otherBoxProps}
    >
      {cards}
    </Stack>
  );
});
