import React, { memo, useMemo } from 'react';

import { View, StyleSheet } from 'react-native';
import { CardGroupBaseProps } from '@cbhq/cds-common';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { join } from '@cbhq/cds-common/utils/join';
import { BoxProps } from '../layout/Box';
import { Divider } from '../layout/Divider';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Card } from './Card';
import { useFeatureFlag } from '../system/useFeatureFlag';

export type CardGroupProps = CardGroupBaseProps<BoxProps>;

export const CardGroup = memo(function CardGroup({
  accessibilityLabel,
  children,
  testID,
  horizontal,
  ...otherBoxProps
}: CardGroupProps) {
  const isFrontier = useFeatureFlag('frontierCard');
  const Stack = horizontal ? HStack : VStack;

  const cards = useMemo(() => {
    const nodes = flattenNodes(children)
      .filter((child) => child && typeof child === 'object' && child.type === Card)
      .map((child) => {
        return <View style={styles.cardItem}>{child}</View>;
      });

    if (isFrontier) {
      return join(nodes, <Divider />);
    }
    return nodes;
  }, [children, isFrontier]);

  return (
    <Stack
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      alignItems="stretch"
      flexWrap="nowrap"
      gap={isFrontier ? 0 : 1}
      testID={testID}
      {...otherBoxProps}
    >
      {cards}
    </Stack>
  );
});

const styles = StyleSheet.create({
  cardItem: {
    flex: 1,
  },
});
