import React, { memo } from 'react';

import type { CellProps as CellBaseProps } from '@cbhq/cds-common/types';
import { css } from 'linaria';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
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

  const offsetClassName = useOffsetStyles({ offsetHorizontal: 2 });

  let content = (
    <HStack
      flexGrow={1}
      background={selected ? 'backgroundAlternate' : undefined}
      borderRadius="standard"
      alignItems={alignItems}
      gap={2}
      spacingHorizontal={reduceHorizontalSpacing ? 1 : 2}
      spacingVertical={1}
      width="100%"
      testID={testID}
      dangerouslySetClassName={onPress ? undefined : offsetClassName}
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
        <Box
          flexGrow={1}
          flexShrink={1}
          alignItems="flex-end"
          justifyContent="flex-end"
          width={detailWidth}
        >
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
        className={`${pressClassName} ${offsetClassName}`}
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
      spacingHorizontal={3}
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
