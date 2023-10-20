import React, { memo } from 'react';
import { ViewProps } from 'react-native';
import { CellBaseProps } from '@cbhq/cds-common';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
import { hasCellPriority } from '@cbhq/cds-common/utils/cell';

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
  borderRadius = 'rounded',
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
  accessibilityLabel,
  accessibilityHint,
  /** Props for useCellSpacing */
  ...spacingProps
}: CellProps) {
  const spacing = useCellSpacing(spacingProps);
  const offsetStyle = useOffsetStyles({ offsetHorizontal: spacing.inner.offsetHorizontal });

  let content = (
    <HStack
      alignItems={alignItems}
      background={selected ? 'backgroundAlternate' : undefined}
      borderRadius={borderRadius}
      flexGrow={1}
      gap={2}
      renderToHardwareTextureAndroid={disabled}
      testID={testID}
      width="100%"
      {...spacing.inner}
      offsetHorizontal={onPress ? undefined : spacing.inner.offsetHorizontal}
    >
      {!!media && (
        <Box flexGrow={0} flexShrink={0}>
          {media}
        </Box>
      )}

      <Box
        flexGrow={1}
        flexShrink={hasCellPriority('start', priority) ? 0 : 1}
        justifyContent="flex-start"
      >
        {children}
      </Box>

      {!!intermediary && (
        <Box
          flexGrow={0}
          flexShrink={hasCellPriority('middle', priority) ? 0 : 1}
          justifyContent="center"
        >
          {intermediary}
        </Box>
      )}

      {!!detail && (
        <Box
          alignItems="flex-end"
          flexGrow={detailWidth ? undefined : 1}
          flexShrink={
            // eslint-disable-next-line no-nested-ternary
            detailWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1
          }
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
        block
        noScaleOnPress
        transparentWhileInactive
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        backgroundColor="background"
        borderRadius={borderRadius}
        contentStyle={pressStyles}
        disabled={disabled}
        onPress={onPress}
        style={[offsetStyle, pressStyles]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Box
      alignItems="stretch"
      flexDirection="row"
      maxHeight={maxHeight}
      minHeight={minHeight}
      onLayout={onLayout}
      width="100%"
      {...spacing.outer}
    >
      {content}
    </Box>
  );
});

Cell.displayName = 'Cell';

// Since Pressable and Interactable wraps with another `View`,
// we need to apply flex styles to those wrappers!
const pressStyles = {
  alignItems: 'stretch',
  flexGrow: 1,
  flexDirection: 'row',
} as const;
