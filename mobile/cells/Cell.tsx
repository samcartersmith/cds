import React, { memo } from 'react';

import { CellProps } from '@cbhq/cds-common';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';
import { CellMedia } from './CellMedia';
import { MediaFallback } from './MediaFallback';

export type { CellProps };

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
  onPress,
  reduceHorizontalSpacing,
  selected,
  testID,
  ...props
}: CellProps) {
  if (
    process.env.NODE_ENV !== 'production' &&
    media &&
    media.type !== CellMedia &&
    media.type !== MediaFallback
  ) {
    console.error('Cell media must be a `CellMedia` component.');
  }

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

      <Box flexGrow={1} flexShrink={1} justifyContent="flex-start">
        {children}
      </Box>

      {!!intermediary && (
        <Box flexGrow={0} flexShrink={1} justifyContent="center">
          {intermediary}
        </Box>
      )}

      {!!detail && (
        <Box
          flexGrow={detailWidth ? undefined : 1}
          flexShrink={detailWidth ? undefined : 1}
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
      spacingVertical={1}
      spacingHorizontal={3}
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
