import React, { memo } from 'react';

import type { CellBaseProps } from '@cbhq/cds-common/types';
import { css } from 'linaria';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable, LinkableProps } from '../system/Pressable';
import { CellMedia } from './CellMedia';
import { MediaFallback } from './MediaFallback';

export interface CellSharedProps extends LinkableProps {
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
  offsetHorizontal,
  onPress,
  reduceHorizontalSpacing,
  selected,
  testID,
  to,
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
  const linkable = Boolean(onPress || to);

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
      dangerouslySetClassName={linkable ? undefined : offsetClassName}
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
          flexGrow={detailWidth ? undefined : 1}
          flexShrink={detailWidth ? undefined : 1}
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

  if (onPress || to) {
    content = (
      <Pressable
        noScaleOnPress
        transparentWhileInactive
        backgroundColor="background"
        borderRadius="standard"
        disabled={disabled}
        onPress={onPress}
        to={to}
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
      offsetHorizontal={offsetHorizontal}
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
