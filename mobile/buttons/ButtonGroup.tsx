import React, { Children, cloneElement, memo } from 'react';

import { ButtonGroupBaseProps } from '@cbhq/cds-common';
import { View, StyleSheet } from 'react-native';

import { HStack, VStack } from '../layout';

export const ButtonGroup = memo(function ButtonGroup({
  accessibilityLabel,
  block,
  children,
  vertical,
}: ButtonGroupBaseProps) {
  const Stack = vertical ? VStack : HStack;

  return (
    <Stack
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      alignItems="stretch"
      flexWrap="nowrap"
      gap={2}
    >
      {Children.map(children, child =>
        child ? (
          <View style={block ? styles.button : undefined}>{cloneElement(child, { block })}</View>
        ) : null
      )}
    </Stack>
  );
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
});
