import React, { memo } from 'react';

import { CellProps as CellBaseProps } from '@cbhq/cds-common';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';
import { CellMedia } from './CellMedia';
import { MediaFallback } from './MediaFallback';

export interface CellProps extends CellBaseProps {
  as?: 'div' | 'li';
}

export const Cell = memo(function Cell({
  accessory,
  as: Tag = 'div',
  alignItems = 'center',
  children,
  detail,
  disabled,
  media,
  maxContentWidth,
  maxDetailWidth,
  minContentWidth,
  minDetailWidth,
  minHeight,
  onPress,
  selected,
  testID,
}: CellProps) {
  if (
    process.env.NODE_ENV !== 'production' &&
    media &&
    media.type !== CellMedia &&
    media.type !== MediaFallback
  ) {
    console.error('Cell media must be a `CellMedia` component.');
  }

  const content = (
    <HStack
      background={selected ? 'backgroundAlternate' : undefined}
      alignItems={alignItems}
      minHeight={minHeight}
      spacing={2}
      testID={testID}
    >
      {media && (
        <Box flexGrow={0} flexShrink={0} spacingEnd={2}>
          {media}
        </Box>
      )}

      <Box
        flexGrow={1}
        flexShrink={1}
        justifyContent="flex-start"
        minWidth={minContentWidth}
        maxWidth={maxContentWidth}
      >
        {children}
      </Box>

      {detail && (
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

      {accessory && (
        <Box flexGrow={0} flexShrink={0} spacingStart={2}>
          {accessory}
        </Box>
      )}
    </HStack>
  );

  if (onPress) {
    return (
      <Pressable
        as="button"
        noScaleOnPress
        transparentWhileInactive
        backgroundColor="background"
        block
        disabled={disabled}
        onPress={onPress}
      >
        {content}
      </Pressable>
    );
  }

  return <Tag>{content}</Tag>;
});
