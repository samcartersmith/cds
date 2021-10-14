import React, { memo } from 'react';

import { CardGroupBaseProps, useBeta } from '@cbhq/cds-common';
import { View, StyleSheet } from 'react-native';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Card } from './Card';

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
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      alignItems="stretch"
      flexWrap="nowrap"
      gap={frontierCard ? 0 : 1}
      testID={testID}
      {...otherBoxProps}
    >
      {flattenNodes(children)
        .filter((child) => child && typeof child === 'object' && child.type === Card)
        .map((child) => {
          return <View style={styles.cardItem}>{child}</View>;
        })}
    </Stack>
  );
});

const styles = StyleSheet.create({
  cardItem: {
    flex: 1,
  },
});
