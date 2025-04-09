import React, { Children, cloneElement, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroupBaseProps, SharedProps } from '@cbhq/cds-common2';

import { Box } from '../layout/Box';

export type ButtonGroupProps = ButtonGroupBaseProps & SharedProps;

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
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      alignItems="stretch"
      flexDirection={isVertical ? 'column' : 'row'}
      flexWrap="nowrap"
      gap={1}
      testID={testID}
    >
      {Children.map(children, (child) =>
        child ? (
          <View style={block ? styles.button : undefined}>{cloneElement(child, { block })}</View>
        ) : null,
      )}
    </Box>
  );
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
});
