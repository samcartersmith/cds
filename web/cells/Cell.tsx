import React, { memo } from 'react';

import type { CellProps as CellBaseProps } from '@cbhq/cds-common/types';
import { css } from 'linaria';

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
  as = 'div',
  alignItems = 'center',
  children,
  detail,
  disabled,
  intermediary,
  media,
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

  let content = (
    <HStack
      flexGrow={1}
      background={selected ? 'backgroundAlternate' : undefined}
      borderRadius="standard"
      alignItems={alignItems}
      gap={2}
      spacingHorizontal={2}
      spacingVertical={1}
      testID={testID}
      {...props}
    >
      {media && (
        <Box flexGrow={0} flexShrink={0}>
          {media}
        </Box>
      )}

      <Box flexGrow={1} flexShrink={1} justifyContent="flex-start">
        {children}
      </Box>

      {intermediary && (
        <Box flexGrow={0} flexShrink={1} justifyContent="center">
          {intermediary}
        </Box>
      )}

      {detail && (
        <Box flexGrow={1} flexShrink={1} alignItems="flex-end" justifyContent="flex-end">
          {detail}
        </Box>
      )}

      {accessory && (
        <Box flexGrow={0} flexShrink={0}>
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
        disabled={disabled}
        onPress={onPress}
        className={pressClassName}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Box
      as={as}
      alignItems="stretch"
      width="100%"
      minHeight={minHeight}
      spacingVertical={1}
      spacingHorizontal={1}
    >
      {content}
    </Box>
  );
});

const pressClassName = css`
  align-items: stretch;
  flex-grow: 1;
  display: flex;
`;
