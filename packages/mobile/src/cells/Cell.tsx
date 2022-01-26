import React, { memo } from 'react';
import { ViewProps } from 'react-native';
import { CellBaseProps } from '@cbhq/cds-common';
import { useCellSpacing } from '@cbhq/cds-common/src/hooks/useCellSpacing';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { LinkableProps, Pressable } from '../system/Pressable';

export type CellSharedProps = {
  /** Measure the dimensions of the cell. */
  onLayout?: ViewProps['onLayout'];
} & LinkableProps;

export type CellProps = CellBaseProps & CellSharedProps;

export const Cell = memo(function Cell({
  accessory,
  alignItems = 'center',
  borderRadius = 'standard',
  children,
  detail,
  detailWidth,
  disabled,
  intermediary,
  media,
  minHeight,
  maxHeight,
  onLayout,
  onPress,
  priority,
  selected,
  testID,
  /** Props for useCellSpacing */
  ...spacingProps
}: CellProps) {
  const spacing = useCellSpacing(spacingProps);
  const offsetStyle = useOffsetStyles({ offsetHorizontal: spacing.inner.offsetHorizontal });

  let content = (
    <HStack
      background={selected ? 'backgroundAlternate' : undefined}
      borderRadius={borderRadius}
      alignItems={alignItems}
      flexGrow={1}
      gap={2}
      width="100%"
      renderToHardwareTextureAndroid={disabled}
      testID={testID}
      {...spacing.inner}
      offsetHorizontal={onPress ? undefined : spacing.inner.offsetHorizontal}
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
          // eslint-disable-next-line no-nested-ternary
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
        borderRadius={borderRadius}
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
      maxHeight={maxHeight}
      onLayout={onLayout}
      {...spacing.outer}
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
