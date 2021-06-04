import React, { memo } from 'react';

import type { CellProps as CellBaseProps } from '@cbhq/cds-common/types';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';
import { CellMedia } from './CellMedia';
import { MediaFallback } from './MediaFallback';

export interface CellSharedProps {
  /** The type of outer wrapping element. */
  as?: 'div' | 'li';
}

export interface CellProps extends CellBaseProps, CellSharedProps {}

export const Cell = memo(function Cell({
  accessory,
  as: Tag = 'div',
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

  const spacingClass = useSpacingStyles({ spacingVertical: 0.5, spacingHorizontal: 1 });

  let content = (
    <HStack
      background={selected ? 'backgroundAlternate' : undefined}
      borderRadius="standard"
      alignItems={alignItems}
      minHeight={minHeight}
      spacing={2}
      testID={testID}
      {...props}
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

      {intermediary && (
        <Box flexGrow={0} flexShrink={1} justifyContent="center" spacingStart={2}>
          {intermediary}
        </Box>
      )}

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
    content = (
      <Pressable
        as="button"
        noScaleOnPress
        transparentWhileInactive
        backgroundColor="background"
        borderRadius="standard"
        block
        disabled={disabled}
        onPress={onPress}
      >
        {content}
      </Pressable>
    );
  }

  return <Tag className={spacingClass}>{content}</Tag>;
});
