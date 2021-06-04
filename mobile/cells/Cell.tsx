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
  disabled,
  intermediary,
  media,
  maxContentWidth,
  maxDetailWidth,
  minContentWidth,
  minDetailWidth,
  minHeight,
  onPress,
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
      minHeight={minHeight}
      spacing={2}
      renderToHardwareTextureAndroid={disabled}
      testID={testID}
      dangerouslySetStyle={onPress ? undefined : offsetStyle}
      {...props}
    >
      {!!media && (
        <Box flexGrow={0} flexShrink={0} spacingEnd={2}>
          {media}
        </Box>
      )}

      <Box
        flexGrow={1}
        flexShrink={0}
        justifyContent="flex-start"
        minWidth={minContentWidth}
        maxWidth={maxContentWidth}
      >
        {children}
      </Box>

      {!!intermediary && (
        <Box flexGrow={0} flexShrink={1} justifyContent="center" spacingStart={2}>
          {intermediary}
        </Box>
      )}

      {!!detail && (
        <Box
          flexGrow={1}
          flexShrink={1}
          alignItems="flex-end"
          justifyContent="flex-end"
          spacingStart={2}
          minWidth={minDetailWidth}
          maxWidth={maxDetailWidth}
        >
          {detail}
        </Box>
      )}

      {!!accessory && (
        <Box flexGrow={0} flexShrink={0} spacingStart={2}>
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
        style={offsetStyle}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Box spacingVertical={0.5} spacingHorizontal={3}>
      {content}
    </Box>
  );
});
