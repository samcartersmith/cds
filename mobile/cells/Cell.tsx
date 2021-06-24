import React, { memo } from 'react';

import { CellBaseProps } from '@cbhq/cds-common';
import { ViewProps } from 'react-native';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable, LinkableProps } from '../system/Pressable';

export interface CellSharedProps extends LinkableProps {
  /** Measure the dimensions of the cell. */
  onLayout?: ViewProps['onLayout'];
}

export interface CellProps extends CellBaseProps, CellSharedProps {}

export const Cell = memo(function Cell({
  accessory,
  alignItems = 'center',
  children,
  detail,
  detailWidth,
  disabled,
  intermediary,
  media,
  minHeight,
  offsetHorizontal,
  onLayout,
  onPress,
  priority,
  reduceHorizontalSpacing,
  selected,
  testID,
  ...props
}: CellProps) {
  const offsetStyle = useOffsetStyles({ offsetHorizontal: 2 });

  let content = (
    <HStack
      background={selected ? 'backgroundAlternate' : undefined}
      borderRadius="standard"
      alignItems={alignItems}
      flexGrow={1}
      gap={2}
      spacingHorizontal={reduceHorizontalSpacing ? 1 : 2}
      spacingVertical={1}
      width="100%"
      renderToHardwareTextureAndroid={disabled}
      testID={testID}
      dangerouslySetStyle={onPress ? undefined : offsetStyle}
      {...props}
    >
      {!!media && (
        <Box flexGrow={0} flexShrink={0}>
          {media}
        </Box>
      )}

      <Box flexGrow={1} flexShrink={priority === 'start' ? 0 : 1} justifyContent="flex-start">
        {children}
      </Box>

      {!!intermediary && (
        <Box flexGrow={0} flexShrink={priority === 'middle' ? 0 : 1} justifyContent="center">
          {intermediary}
        </Box>
      )}

      {!!detail && (
        <Box
          flexGrow={detailWidth ? undefined : 1}
          flexShrink={detailWidth ? undefined : priority === 'end' ? 0 : 1}
          alignItems="flex-end"
          justifyContent="flex-end"
          width={detailWidth}
        >
          {detail}
        </Box>
      )}

      {!!accessory && (
        <Box flexGrow={0} flexShrink={0}>
          {accessory}
        </Box>
      )}
    </HStack>
  );

  if (onPress) {
    content = (
      <Pressable
        noScaleOnPress
        transparentWhileInactive
        backgroundColor="background"
        borderRadius="standard"
        block
        disabled={disabled}
        onPress={onPress}
        style={[offsetStyle, pressStyles]}
        contentStyle={pressStyles}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Box
      alignItems="stretch"
      flexDirection="row"
      width="100%"
      minHeight={minHeight}
      offsetHorizontal={offsetHorizontal}
      spacingVertical={1}
      spacingHorizontal={3}
      onLayout={onLayout}
    >
      {content}
    </Box>
  );
});

// Since Pressable and Interactable wraps with another `View`,
// we need to apply flex styles to those wrappers!
const pressStyles = {
  alignItems: 'stretch',
  flexGrow: 1,
  flexDirection: 'row',
} as const;
